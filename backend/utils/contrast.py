from playwright.async_api import async_playwright
from wcag_contrast_ratio import rgb  
from typing import List, Dict


def calculate_contrast_ratio(fg_color: str, bg_color: str) -> float:
    try:
        return rgb.contrast_ratio(fg_color, bg_color)
    except Exception:
        return 0


async def check_text_contrast(url: str, threshold: float = 4.5, max_elements: int = 200) -> List[Dict]:
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto(url, timeout=30000, wait_until='load')

        elements_data = await page.evaluate(f'''
            () => {{
                const tags = ["p","h1","h2","h3","h4","h5","h6","a","span","div","li","label","button"];
                const nodes = Array.from(document.querySelectorAll(tags.join(",")));
                return nodes.filter(el => {{
                    const style = window.getComputedStyle(el);
                    return (
                        el.innerText.trim() &&
                        style.display !== 'none' &&
                        style.visibility !== 'hidden' &&
                        style.opacity !== '0'
                    );
                }}).slice(0, {max_elements}).map(el => {{
                    const style = window.getComputedStyle(el);
                    return {{
                        text: el.innerText.trim(),
                        color: style.color,
                        background: style.backgroundColor
                    }};
                }});
            }}
        ''')

        issues = []
        for data in elements_data:
            ratio = calculate_contrast_ratio(data["color"], data["background"])
            if ratio < threshold:
                issues.append({
                    "text": data["text"][:50],
                    "color": data["color"],
                    "background": data["background"],
                    "ratio": round(ratio, 2)
                })

        await browser.close()
        return issues