# TRACEAL Console - Exact Figma Implementation Plan

## Goal
Implement all 14 Figma frames with ZERO differences - exact pixel-perfect matching

## 14 Frames to Implement

1. **269:395** - Text element
2. **300:2540** - Frame 16 (Observer Log)
3. **274:400** - Frame 5 (Event Log)
4. **280:940** - Frame 10 (Tamper Alert)
5. **303:3183** - Frame 21 (Sensor Detail Modal)
6. **275:514** - Frame 6 (Loading)
7. **277:799** - Frame 9 (Dashboard)
8. **300:2505** - Frame 15 (Re-authentication)
9. **275:646** - Frame 8 (Splash)
10. **301:2837** - Frame ? (TBD)
11. **267:363** - Frame 4 (Login)
12. **303:3147** - Frame ? (TBD)
13. **300:2651** - Frame ? (TBD)
14. **301:2866** - Frame ? (TBD)

## Implementation Strategy

### Phase 1: Get All Designs (COMPLETED)
- [x] Use Figma MCP to get exact CSS/layout for all 14 frames
- [x] Get screenshots for visual reference
- [x] Document exact positioning, colors, fonts, spacing

### Phase 2: Rebuild HTML Structure
- [ ] Create clean HTML with exact Figma positioning (absolute positioning)
- [ ] Use downloaded SVG icons from `/icons/` folder
- [ ] Match exact text content, font sizes, weights

### Phase 3: Rebuild CSS
- [ ] Exact colors from Figma
- [ ] Exact font sizes and weights
- [ ] Exact positioning (top, left, width, height)
- [ ] Exact spacing and alignment

### Phase 4: Add Functionality
- [ ] Screen navigation
- [ ] Form submissions
- [ ] Modal interactions
- [ ] Click handlers

### Phase 5: Testing
- [ ] Test all screens match Figma exactly
- [ ] Test all interactions work
- [ ] Test on iPhone

## Notes
- NO approximations
- NO "close enough"
- EXACT pixel matching
- Use Figma MCP for precise measurements

