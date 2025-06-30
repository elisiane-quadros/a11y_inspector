from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.scanner.core import (
    fetch_html, 
    check_images_without_alt,
    check_inputs_without_label,
    check_heading_structure,
    check_links_with_vague_text,
    check_buttons_without_label,
    check_missing_landmarks
)

from backend.utils.contrast import check_text_contrast 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CheckRequest(BaseModel):
    url: str

@app.post("/api/check")

def check_acessibility(data: CheckRequest):
    try:
        soup = fetch_html(data.url)

        results = {
            "images": check_images_without_alt(soup),
            "forms": check_inputs_without_label(soup),
            "headings": check_heading_structure(soup),
            "links": check_links_with_vague_text(soup),
            "buttons": check_buttons_without_label(soup),
            "landmarks": check_missing_landmarks(soup),
        }
        return {"sucess": True, "results": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail={"success": False, "error": str(e)})
    
@app.post("/api/contrast")
async def contrast_analysis(data: CheckRequest):
    try:
        contrast_results = await check_text_contrast(data.url)
        return {"success": True, "contrast_issues": contrast_results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.get("/")
def root():
    return {"message": "Ativado com suceso!"}