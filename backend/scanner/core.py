import requests
from bs4 import BeautifulSoup

def fetch_html(url:str) -> BeautifulSoup:
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")


def check_images_without_alt(soup:BeautifulSoup) -> list:
    images = soup.find_all("img")
    issues = []
    for img in images:
        if not img.has_attr("alt") or not img["alt"].strip():
            issues.append({
                "src": img.get("src", ""),
                "html": str(img)[:100]
            })
    return issues


def check_inputs_without_label(soup: BeautifulSoup):
    form_fields = soup.find_all(["input", "textarea", "select"])
    issues = []

    for field in form_fields:
        field_type = field.get("type", field.name)
        
        if field_type in ["hidden", "submit", "reset", "button"]:
            continue

        field_id = field.get("id")
        label = soup.find("label", attrs={"for": field_id}) if field_id else None

        has_label = (
            label
            or field.has_attr("aria-label")
            or field.has_attr("aria-labelledby")
            or field.has_attr("title")
        )

        if not has_label:
            issues.append({
                "tag": field.name,
                "type": field_type,
                "name": field.get("name", ""),
                "id": field_id or "",
                "placeholder": field.get("placeholder", ""),
                "html": str(field)[:200],
                "text": field.text.strip() if hasattr(field, "text") else "",
                "message": "Campo de formulário sem rótulo acessível."
            })

    return issues


def check_heading_structure(soup: BeautifulSoup):
    headings = soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6"])
    issues = []
    last_level = 0
    h1_count = 0

    for heading in headings:
        tag = heading.name
        level = int(tag[1])

        if level == 1:
            h1_count += 1

        if last_level and level > last_level + 1:
            issues.append(f"Salto de <h{last_level}> para <h{level}>: {heading.text.strip()[:40]}")

        last_level = level

    if h1_count != 1:
        issues.insert(0, f"Encontrados {h1_count} elementos <h1>. O ideal é exatamente 1.")

    return issues


def check_links_with_vague_text(soup: BeautifulSoup):
    vague_texts = [
        "clique aqui", "saiba mais", "leia mais", "acesse", "ver mais", "continue lendo",
        "detalhes", "mais", "aqui", "ver", "confira"
    ]

    issues = []

    for a in soup.find_all("a"):
        text = a.get_text(strip=True).lower()
        href = a.get("href", "#")

        if text in vague_texts:
            issues.append(
                f'Link com texto genérico: "{a.get_text(strip=True)}" — href: {href}'
            )

    return issues

def check_buttons_without_label(soup: BeautifulSoup):
    buttons = soup.find_all(["button", "span", "div"])
    issues = []

    for btn in buttons:
        role = btn.get("role")
        is_clickable = (
            btn.name == "button"
            or role == "button"
            or "onclick" in btn.attrs
        )

        if is_clickable:
            has_label = (
                btn.get_text(strip=True)
                or btn.has_attr("aria-label")
                or btn.has_attr("aria-labelledby")
                or btn.has_attr("title")
            )
            if not has_label:
                class_attr = " ".join(btn.get("class", [])) if btn.get("class") else ""
                id_attr = btn.get("id", "")
                text = btn.get_text(strip=True)
                msg = f"<{btn.name}> sem rótulo acessível"
                if class_attr:
                    msg += f" — class=\"{class_attr}\""
                if id_attr:
                    msg += f" — id=\"{id_attr}\""
                if text:
                    msg += f" | texto visível: \"{text}\""
                else:
                    msg += " | texto visível: [vazio]"
                issues.append({
                    "tag": btn.name,
                    "html": str(btn)[:150],
                    "id": id_attr,
                    "class": class_attr,
                    "text": text,
                    "message": msg
                })
    return issues

def check_missing_landmarks(soup: BeautifulSoup):
    required_landmarks = ["main", "nav", "header", "footer"]
    issues = []

    for tag in required_landmarks:
        if not soup.find(tag):
            issues.append(f"<{tag}> Ausente - esse landmark é importante para estruturação semântica.")

    return issues
           