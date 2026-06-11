# [Slide 1: Title]
Slide Content (Korean):
- Title Text: 인공지능의 업무 대체 속도와 분야에 관한 분석과 전망

Visual Design & Layout:
- Clean, centered editorial layout following the Obsidian Editorial design system guidelines.
- Standard high-contrast Geist typography with generous negative space.

Technical & Formatting Notes:
- The text block must enforce internal centering (`text-align: center`). If the title wraps into multiple lines due to length, it should maintain clean vertical line heights and central alignment within the bounding box.

---

# [Slide 2: Introduction]
Slide Content (Korean):
- Milestone 1: 18세기 (1760년대) | 증기기관 / 산업혁명
  - Type: 육체 노동의 자동화
- Milestone 2: 20세기 후반 ~ 21세기 초 | 인터넷 / 스마트폰
  - Type: 정보 및 디지털 자동화
- Milestone 3: 2020년대 ~ 현재 | 인공지능 (AI)
  - Type: 인지 및 창의 업무 대체
- Key Question:
  "AI는 언제, 어떻게, 얼마나 우리의 업무를 대체할 것인가?"

Visual Design & Layout:
- A sophisticated, step-by-step flat horizontal timeline displaying key technological leaps.
- Milestone 1 (Steam Engine), Milestone 2 (Internet/Smartphone), and Milestone 3 (AI) are positioned sequentially along a single, continuous flat baseline.
- Milestone 3 (AI) is highlighted with a high-contrast accent color (e.g., Deep Forest Green or Muted Bronze from DESIGN.md), emphasizing the AI revolution.

Interaction & Fragment Progression:
- Initial View: Display only Milestone 1 and Milestone 2.
- Fragment 1 (On FORWARD): Milestone 3 (AI) and its details fade in dynamically below/after Milestone 2, highlighting the steep upward trajectory.
- Fragment 2 (On subsequent FORWARD): The background timeline dims (opacity to 15%), and the Key Question fades in at the center of the screen in a prominent, centered editorial block.

---

# [Slide 3: Hypothesis]
Slide Content (Korean):
- Heading Text: 가설
- Body Text: 2027년 말까지 소프트웨어 분야에서 시니어 이상의 숙련도를 요구하지 않는 업무는 60% 이상 AI로 대체될 것이며, 이후 로보틱스의 개발에 따라 물리적 노동을 요구하는 분야까지 AI가 침투할 것이다.

Visual Design & Layout:
- Centered block layout with the Heading Text ("가설") detached and positioned near the top.
- The Body Text is centered horizontally and vertically on the slide canvas.

Styling & Highlights:
- Body Text is set in primary neutral white. The following key phrases must be highlighted using a 20% opacity accent background (Deep Forest Green or Muted Bronze) with a solid bottom-border:
  - "2027년 말"
  - "소프트웨어 분야"
  - "60% 이상 AI로 대체"

---

# [Slide 4: Research Methodology]
Slide Content (Korean):
- Heading Text: 연구방법론
- Methodology Point 1: 거시적 관점의 문헌 연구법
- Methodology Point 2: 2차 자료 수집 및 교차 분석

Visual Design & Layout:
- Split-screen layout (Left / Right columns).
- Left column: The heading text followed by the methodology bullet points, left-aligned with clean vertical spacing.
- Right column: An embedded iframe displaying the live tool `https://ai-2027.com/`.

Technical Notes:
- The iframe must be interactive, allowing users to scroll and surf within the embedded site.
- The global keyboard event listeners (forward/backward keys) must not be intercepted or blocked by the iframe's focus, maintaining slide navigation capabilities.
- The iframe container should blend with the dark Obsidian theme, potentially using a subtle overlay or dark-mode configuration where applicable.

---

# [Slide 5: Theoretical Background & Data Analysis]
Slide Content (English & Korean):
- Curve Slider & Data Points
- Overlay Card Details (On Fragment 1):
  - Metrics: "AI 2027", "x2.25 per year", "x10 by 2027"
  - Alliance Logos: Samsung, TSMC, Google, Tesla
  - Node Connector: "+" sign & "TeraFab" logo

Visual Design & Layout:
- Extract and recreate the animated capability curve from the top-right of `https://ai-2027.com/`, centered on the slide canvas.
- A functional slider control is placed adjacent to the graph. Moving the slider dynamically animates and transitions the timeline of the capability curve.

Interaction & Fragment Progression:
- Initial View: Recreated curve and timeline slider.
- Fragment 1 (On FORWARD):
  - The main curve graph dims to 15% opacity.
  - Left column: Metrics ("AI 2027", "x2.25 per year", "x10 by 2027") fade in.
  - Right column: A connected node diagram containing monochrome (black and white) corporate logos of Samsung, TSMC, Google, and Tesla enclosed in a circle appears, leading to a "+" sign and the "TeraFab" logo below.

---

# [Slide 6: Evidence & Case Studies]
Slide Content (Korean):
- Baseline Layout: Recreated layoffs chart from `https://www.trueup.io/layoffs`.
- Fragment 1: [메타 로고] + "주니어급 개발자 10% 이상 해고"
- Fragment 2: [Andrej Karpathy 사진] + "5개월간 직접 코딩 0건"
- Fragment 3: [구글 로고] + "제미나이 검색 10억 명 돌파"

Visual Design & Layout:
- The top half of the slide displays the layoff data visualization styled in Obsidian Editorial monochrome theme colors.
- Sequential testimonial/evidence cards are centered below the graph.

Interaction & Fragment Progression:
- Initial View: Only the layoffs chart is visible.
- Fragment 1 (On FORWARD): The Meta card fades in below the chart.
- Fragment 2 (On subsequent FORWARD): The layoffs chart and previous card dim, and the Andrej Karpathy photo/testimonial card fades in.
- Fragment 3 (On subsequent FORWARD): The previous card dims, and the Google Gemini card fades in.

---

# [Slide 7: Hypothesis Evaluation]
Slide Content (Korean):
- Heading Text: 결론
- Evaluation Thesis: 2027년 말까지 소프트웨어 분야에서 시니어 이상의 숙련도를 요구하지 않는 업무는 60% 이상 AI로 대체될 것이며, 이후 로보틱스의 개발에 따라 물리적 노동을 요구하는 분야까지 AI가 침투할 것이다.
- Evaluation Correction: "주니어급 업무"

Visual Design & Layout:
- Large, centered typographic layout showing the original thesis statement.

Interaction & Fragment Progression:
- Initial View: Display the full original hypothesis thesis in white text.
- Fragment 1 (On FORWARD): Animate a red cross-out strike line over the phrase "시니어 이상의 숙련도를 요구하지 않는", and fade in the replacement text "주니어급 업무" in a green highlight above or adjacent to it.
- Fragment 2 (On subsequent FORWARD): Animate a strike line crossing out the second half of the thesis ("에 따라 물리적 노동을 요구하는 분야까지 AI가 침투할 것이다"), which then fades out or collapses to signify lack of evidence.

---

# [Slide 8: Conclusion & Future Outlook]
Visual Design & Layout:
- A centered minimalist compass graphic.
- The compass needle oscillates dynamically and swings organically back and forth to symbolize navigating through future shifts.