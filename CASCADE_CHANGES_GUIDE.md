# CASCADE AI CHANGES GUIDE

## FILES CREATED BY CASCADE AI (All prefixed with "CASCADE_")

### 📄 ARTICLE FILES (articles/spring-2025/)
- `CASCADE_sustainable-finance.html` - Business Strategy article
- `CASCADE_quantum-computing.html` - Technology article  
- `CASCADE_supply-chain.html` - Business Strategy article
- `CASCADE_creator-economy.html` - Entrepreneurship article
- `CASCADE_healthcare-innovation.html` - Technology article

### 🖼️ COVER IMAGES (assets/img/spring-2025/covers/)
- `CASCADE_sustainable-finance-cover.png`
- `CASCADE_quantum-computing-cover.png` 
- `CASCADE_supply-chain-cover.png`
- `CASCADE_creator-economy-cover.png`
- `CASCADE_healthcare-innovation-cover.png`

### 📖 PUBLICATION PAGE
- `publications/CASCADE_spring-2025.html` - Magazine flipbook page

### 🗂️ PUBLICATION IMAGES
- `images/medium/CASCADE_Spring_2025/` - Folder with 41 magazine page images

---

## WHERE TO MAKE CHANGES

### 🔧 TO CUSTOMIZE ARTICLES:
**In each `CASCADE_*.html` file:**
- **Line ~157**: `<h2>` - Change article title
- **Throughout**: `<p>` tags - Replace with your article content  
- **Image tags**: `src="..."` - Replace with your image paths
- **Line ~211**: `<a href="...">` - Replace external link URL

### 🔧 TO CUSTOMIZE PUBLICATIONS PAGE:
**In `publications.html`:**
- **Lines 215, 219, 223, 227, 231**: Change article titles
- **Lines 216, 220, 224, 228, 232**: Update file paths if you rename files
- **Line 237**: Update cover image path
- **Line 238**: Add your PDF path when ready

### 🔧 TO CUSTOMIZE HOMEPAGE BANNER:
**In `index.html`:**
- **Lines 119, 134, 149, 164, 179**: Update cover image paths
- **Lines 124, 139, 154, 169, 184**: Change article titles and links

---

## IMAGE REQUIREMENTS
- **Cover images**: PNG format, any size (will auto-resize)
- **Article images**: JPG/PNG/SVG, max-height: 500px recommended
- **Magazine images**: 41 numbered files (1.jpg to 41.jpg) for flipbook

---

## QUICK CHECKLIST
- [ ] Replace article content in all 5 CASCADE HTML files
- [ ] Replace cover images (5 files)
- [ ] Update article titles in publications.html
- [ ] Update article titles in index.html  
- [ ] Add your magazine PDF to publications/pdfs/
- [ ] Replace magazine page images (optional)

**All CASCADE files are clearly marked with comments showing exactly where to make changes!**

---

## 

### **ZOOM BUG FIX** 
**Problem**: Unwanted zooming behavior on mobile devices and magazine pages
**Solution Applied**:
- Added `touch-action: manipulation` CSS to prevent double-tap zoom
- Added `user-scalable=no` to viewport meta tag
- Added mobile-responsive CSS for magazine viewport
- Applied to both `index.html` and `CASCADE_spring-2025.html`

**Files Modified**:
- `index.html` - Lines 8, 35-68 (viewport + CSS fix)
- `publications/CASCADE_spring-2025.html` - Already had the fix from template
