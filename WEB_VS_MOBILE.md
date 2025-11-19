# Jamuin Web vs Mobile - Comparison

## Overview

Dokumen ini menjelaskan perbedaan antara aplikasi web dan mobile Jamuin dari segi layout, UI/UX, dan teknologi yang digunakan.

## Technology Stack Comparison

| Aspect | Mobile App | Web App |
|--------|-----------|---------|
| **Language** | Kotlin | JavaScript (React) |
| **UI Framework** | Jetpack Compose | React + Tailwind CSS |
| **State Management** | StateFlow & Compose State | Zustand |
| **Navigation** | Jetpack Navigation Compose | React Router DOM |
| **HTTP Client** | Retrofit2 + OkHttp3 | Axios |
| **Image Loading** | Coil | Browser native |
| **Payment** | Midtrans SDK | Midtrans Snap.js |

## Layout Differences

### Mobile App
- **Single Column Layout**: Vertical scrolling
- **Compact Cards**: Smaller footprint untuk mobile screen
- **Bottom Navigation**: Mudah dijangkau dengan thumb
- **Floating Action Buttons**: Quick actions
- **Pull-to-Refresh**: Native gesture

### Web App
- **Multi-Column Grid**: Memanfaatkan wider viewport
- **Larger Cards**: More space untuk informasi
- **Top Horizontal Navigation**: Standard web pattern
- **Prominent CTA Buttons**: Mouse-optimized
- **Sticky Navigation**: Always accessible

## UI Component Differences

### Product Cards

**Mobile:**
```
┌─────────────┐
│   [Image]   │
│   Product   │
│   ₹ Price   │
│   [+] Add   │
└─────────────┘
Compact, touch-optimized
```

**Web:**
```
┌───────────────────────┐
│      [Image]          │
│                       │
│   Product Name        │
│   Description...      │
│   ₹ Price    Stock: X │
│   [Add to Cart] [i]   │
└───────────────────────┘
Spacious, hover effects
```

### Navigation

**Mobile:**
- Bottom tab bar (4-5 items)
- Hamburger menu untuk additional items
- Gesture-based navigation

**Web:**
- Top navbar dengan logo
- Horizontal menu items
- Cart icon dengan badge
- Dropdown menus (if needed)

### Expert System

**Mobile:**
- Full-screen question cards
- Swipe gestures untuk next/prev
- Bottom sheet untuk results

**Web:**
- Centered card layout
- Progress bar at top
- Side-by-side comparison view
- Modal untuk detailed results

### Cart

**Mobile:**
- List view dengan item cards
- Swipe to delete
- Sticky bottom total bar
- Full-width checkout button

**Web:**
- 2-column layout (items + summary)
- Hover states
- Inline quantity controls
- Sidebar summary (sticky)

## User Experience Differences

### Interaction Patterns

**Mobile:**
- Touch gestures (tap, swipe, pinch)
- Pull-to-refresh
- Haptic feedback
- Bottom sheets
- Native share dialog

**Web:**
- Mouse hover effects
- Keyboard shortcuts (optional)
- Context menus
- Tooltips
- Browser back/forward

### Information Density

**Mobile:**
- Progressive disclosure
- One primary action per screen
- Minimal text
- Icon-heavy

**Web:**
- More information visible
- Multiple CTAs possible
- Richer text content
- Icon + text labels

## Responsive Breakpoints (Web)

```css
/* Mobile */
< 768px: Single column, stacked layout

/* Tablet */
768px - 1024px: 2 columns, hybrid layout

/* Desktop */
> 1024px: 3-4 columns, full features
```

## Design System

### Colors

Both apps share the same color palette:
- **Primary**: Orange (#f79f17)
- **Secondary**: Green (#4caf50)
- **Background**: Light gray (#f5f5f5)

### Typography

**Mobile:**
- System fonts (Roboto on Android)
- Smaller base size (14-16px)

**Web:**
- Custom fonts (Poppins + Inter)
- Larger base size (16px)

## Feature Parity

| Feature | Mobile | Web | Notes |
|---------|--------|-----|-------|
| Product Catalog | ✅ | ✅ | Same data |
| Expert System | ✅ | ✅ | Same logic |
| Shopping Cart | ✅ | ✅ | Persistent |
| Checkout | ✅ | ✅ | Different UI |
| Payment | ✅ | ✅ | Different integration |
| Transaction Status | ✅ | ✅ | Real-time |
| Offline Mode | ✅ | ❌ | Mobile only |
| Push Notifications | ✅ | ❌ | Mobile only |
| Browser Bookmarks | ❌ | ✅ | Web only |
| URL Sharing | ❌ | ✅ | Web only |

## Performance Considerations

### Mobile
- Native performance
- Smaller bundle size
- Device-optimized
- Can work offline

### Web
- Requires internet
- Larger initial load
- Faster updates (no app store)
- Cross-platform by default

## When to Use Which?

### Use Mobile App When:
- User needs offline access
- Push notifications important
- Native features required (camera, GPS)
- App store distribution preferred

### Use Web App When:
- Quick access without install
- Cross-platform support needed
- Easier updates/deployments
- SEO important
- Desktop experience desired

## Shared Backend

Both apps connect to the same backend API:
- Same endpoints
- Same data models
- Same business logic
- Consistent responses

This ensures:
- Data consistency
- Easier maintenance
- Unified user experience
- Cost-effective development

## Conclusion

Web dan mobile apps complement each other:
- **Mobile**: Personal, always-available experience
- **Web**: Accessible, shareable, discoverable

Both provide full functionality dengan UI/UX yang optimized untuk masing-masing platform.
