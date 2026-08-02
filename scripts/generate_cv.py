"""Gera os PDFs de curriculo (pt-BR, en-US, es-ES) em public/cv/.

Fonte de conteudo: src/i18n/*.json (mesmas traducoes usadas no site) +
os dados estruturados abaixo, espelhando src/data/profile.ts. Nenhuma
metrica ou fato novo e inventado aqui -- tudo vem de como_ficou_apos_ajuste.pdf.

Layout de coluna unica (paginacao automatica do reportlab) com uma faixa
de cabecalho na cor de marca do site.

Uso: python scripts/generate_cv.py
"""

import json
from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    ListFlowable,
    ListItem,
    HRFlowable,
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

ROOT = Path(__file__).resolve().parent.parent
I18N_DIR = ROOT / "src" / "i18n"
OUT_DIR = ROOT / "public" / "cv"

INK_950 = colors.HexColor("#0d0d0f")
ACCENT = colors.HexColor("#ff6a1a")
PAPER_50 = colors.HexColor("#faf9f7")
TEXT_MUTED = colors.HexColor("#6b6b70")
TEXT_BODY = colors.HexColor("#26262a")
RULE_COLOR = colors.HexColor("#e6e3dc")

PAGE_W, PAGE_H = A4
MARGIN = 20 * mm

CONTACT = {
    "phone": "+55 81 99750-7405",
    "email": "alan.v.lins@gmail.com",
    "linkedin": "linkedin.com/in/alan-v-lins",
    "location": "Recife, Pernambuco, Brasil",
}

EXPERIENCES = [
    {"key": "certi", "company": "Fundação CERTI", "period": "2023 - 2026",
     "location": "Santa Catarina, Brasil (remoto)"},
    {"key": "compass", "company": "Compass.UOL", "period": "2020 - 2022",
     "location": "Recife, Pernambuco"},
    {"key": "mv", "company": "MV S/A", "period": "2014 - 2020",
     "location": "Recife e Região, Brasil"},
    {"key": "accenture", "company": "Accenture Brasil", "period": "2013 - 2014",
     "location": "Recife e Região"},
    {"key": "ufpe", "company": "UFPE", "period": "2012", "location": "Recife e Região"},
]

EDUCATION = [
    {"key": "postGrad", "institution": "Unibratec", "period": "2015 - 2016"},
    {"key": "systems", "institution": "Unibratec", "period": "2010 - 2012"},
    {"key": "electronics", "institution": "Unibratec", "period": "2008 - 2009"},
]

SKILL_GROUPS = {
    "pt-BR": [
        ("Frontend", "React, Angular, AngularJS, Vue.js, TypeScript, HTML5/SCSS"),
        ("Backend", "Node.js, NestJS, FastAPI, Java, Spring Boot, GraphQL"),
        ("Arquitetura", "Microsserviços, EDA, BFF, REST APIs"),
        ("Dados", "PostgreSQL, Oracle, MongoDB, Redis, Databricks"),
        ("Cloud & DevOps", "Azure, AWS Lambda, Docker, CI/CD, RabbitMQ"),
    ],
    "en-US": [
        ("Frontend", "React, Angular, AngularJS, Vue.js, TypeScript, HTML5/SCSS"),
        ("Backend", "Node.js, NestJS, FastAPI, Java, Spring Boot, GraphQL"),
        ("Architecture", "Microservices, EDA, BFF, REST APIs"),
        ("Data", "PostgreSQL, Oracle, MongoDB, Redis, Databricks"),
        ("Cloud & DevOps", "Azure, AWS Lambda, Docker, CI/CD, RabbitMQ"),
    ],
    "es-ES": [
        ("Frontend", "React, Angular, AngularJS, Vue.js, TypeScript, HTML5/SCSS"),
        ("Backend", "Node.js, NestJS, FastAPI, Java, Spring Boot, GraphQL"),
        ("Arquitectura", "Microservicios, EDA, BFF, REST APIs"),
        ("Datos", "PostgreSQL, Oracle, MongoDB, Redis, Databricks"),
        ("Cloud & DevOps", "Azure, AWS Lambda, Docker, CI/CD, RabbitMQ"),
    ],
}

LANGUAGES_SKILL = {
    "pt-BR": [
        ("Português", "Nativo"),
        ("Espanhol", "Avançado"),
        ("Inglês", "Intermediário"),
    ],
    "en-US": [
        ("Portuguese", "Native"),
        ("Spanish", "Advanced"),
        ("English", "Intermediate"),
    ],
    "es-ES": [
        ("Portugués", "Nativo"),
        ("Español", "Avanzado"),
        ("Inglés", "Intermedio"),
    ],
}

SECTION_LABELS = {
    "pt-BR": {
        "summary": "Resumo Profissional",
        "experience": "Experiência Profissional",
        "education": "Formação Acadêmica",
        "skills": "Competências Técnicas",
        "languages": "Idiomas",
    },
    "en-US": {
        "summary": "Professional Summary",
        "experience": "Professional Experience",
        "education": "Education",
        "skills": "Technical Skills",
        "languages": "Languages",
    },
    "es-ES": {
        "summary": "Resumen Profesional",
        "experience": "Experiencia Profesional",
        "education": "Formación Académica",
        "skills": "Competencias Técnicas",
        "languages": "Idiomas",
    },
}


def load_translation(lang: str) -> dict:
    with open(I18N_DIR / f"{lang}.json", encoding="utf-8") as f:
        return json.load(f)


BAND_H = 40 * mm


def header_band(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(INK_950)
    canvas.rect(0, PAGE_H - BAND_H, PAGE_W, BAND_H, stroke=0, fill=1)
    canvas.restoreState()


def build_pdf(lang: str) -> None:
    t = load_translation(lang)
    labels = SECTION_LABELS[lang]

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUT_DIR / f"cv-{lang}.pdf"

    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=14 * mm,
        bottomMargin=16 * mm,
    )

    name_style = ParagraphStyle(
        "Name", fontName="Helvetica-Bold", fontSize=21, textColor=colors.white, leading=24,
    )
    title_style = ParagraphStyle(
        "Title", fontName="Helvetica", fontSize=10.5, textColor=ACCENT, leading=14, spaceBefore=4,
    )
    contact_style = ParagraphStyle(
        "Contact", fontName="Helvetica", fontSize=8.3, textColor=colors.HexColor("#c9c8cc"),
        leading=12, spaceBefore=6,
    )
    section_heading = ParagraphStyle(
        "SectionHeading", fontName="Helvetica-Bold", fontSize=12.5, textColor=ACCENT,
        spaceBefore=16, spaceAfter=6, leading=15,
    )
    body_style = ParagraphStyle(
        "Body", fontName="Helvetica", fontSize=9.4, textColor=TEXT_BODY, leading=13.8,
        alignment=TA_LEFT,
    )
    role_style = ParagraphStyle(
        "Role", fontName="Helvetica-Bold", fontSize=10.5, textColor=INK_950, leading=13,
        spaceBefore=10,
    )
    meta_style = ParagraphStyle(
        "Meta", fontName="Helvetica-Oblique", fontSize=8.3, textColor=TEXT_MUTED, leading=11,
        spaceAfter=4,
    )
    bullet_style = ParagraphStyle(
        "Bullet", fontName="Helvetica", fontSize=9, textColor=TEXT_BODY, leading=12.8,
    )
    skill_label_style = ParagraphStyle(
        "SkillLabel", fontName="Helvetica-Bold", fontSize=8.8, textColor=INK_950, leading=12,
    )
    skill_value_style = ParagraphStyle(
        "SkillValue", fontName="Helvetica", fontSize=8.8, textColor=TEXT_BODY, leading=12,
    )

    story = [
        Spacer(1, 4 * mm),
        Paragraph("Alan D'Almeida Lins", name_style),
        Paragraph(t["hero"]["title"], title_style),
        Paragraph(
            f'{CONTACT["phone"]} &nbsp;·&nbsp; {CONTACT["email"]} &nbsp;·&nbsp; '
            f'{CONTACT["linkedin"]} &nbsp;·&nbsp; {CONTACT["location"]}',
            contact_style,
        ),
        Spacer(1, 16 * mm),
        Paragraph(labels["summary"], section_heading),
        Paragraph(t["about"]["summary"], body_style),
        Paragraph(labels["experience"], section_heading),
    ]

    for exp in EXPERIENCES:
        role = t["experience"][exp["key"]]["role"]
        story.append(Paragraph(f"{role} · {exp['company']}", role_style))
        story.append(Paragraph(f"{exp['period']} — {exp['location']}", meta_style))
        bullets = [v for k, v in t["experience"][exp["key"]].items() if k.startswith("bullet")]
        story.append(
            ListFlowable(
                [ListItem(Paragraph(b, bullet_style), leftIndent=10) for b in bullets],
                bulletType="bullet",
                start="•",
                bulletFontSize=7,
                leftIndent=12,
                spaceBefore=2,
                spaceAfter=2,
            )
        )

    story.append(Paragraph(labels["education"], section_heading))
    edu_rows = []
    for edu in EDUCATION:
        degree = t["education"][edu["key"]]
        edu_rows.append(
            [
                Paragraph(f"<b>{degree}</b>", skill_value_style),
                Paragraph(f"{edu['institution']} · {edu['period']}", meta_style),
            ]
        )
    edu_table = Table(edu_rows, colWidths=[(PAGE_W - 2 * MARGIN) * 0.62, (PAGE_W - 2 * MARGIN) * 0.38])
    edu_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("LINEBELOW", (0, 0), (-1, -2), 0.4, RULE_COLOR),
            ]
        )
    )
    story.append(edu_table)

    story.append(Paragraph(labels["skills"], section_heading))
    skill_rows = [
        [Paragraph(f"{name}:", skill_label_style), Paragraph(value, skill_value_style)]
        for name, value in SKILL_GROUPS[lang]
    ]
    skill_table = Table(skill_rows, colWidths=[28 * mm, (PAGE_W - 2 * MARGIN) - 28 * mm])
    skill_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.append(skill_table)

    story.append(Paragraph(labels["languages"], section_heading))
    lang_rows = [
        [Paragraph(f"{name}:", skill_label_style), Paragraph(level, skill_value_style)]
        for name, level in LANGUAGES_SKILL[lang]
    ]
    lang_table = Table(lang_rows, colWidths=[28 * mm, (PAGE_W - 2 * MARGIN) - 28 * mm])
    lang_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.append(lang_table)

    doc.build(story, onFirstPage=header_band, onLaterPages=lambda c, d: None)
    print(f"OK {out_path}")


if __name__ == "__main__":
    for lang in ("pt-BR", "en-US", "es-ES"):
        build_pdf(lang)
