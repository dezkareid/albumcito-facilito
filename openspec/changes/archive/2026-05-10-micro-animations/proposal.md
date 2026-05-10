## Why

The app currently lacks visual feedback for user interactions, making the experience feel static and unpolished. Adding micro animations for card hovers, like buttons, and sticker zoom views will increase engagement and delight without disrupting the collecting flow.

## What Changes

- Add hover animation to sticker cards (scale + shadow lift effect)
- Add hover animation to album cards on the home engagement sections
- Add animated like button with a heart pulse/bounce effect on click
- Add a sticker lightbox/zoom modal that shows the sticker full-size when clicked

## Capabilities

### New Capabilities
- `card-hover-animation`: Smooth scale and shadow transition on sticker and album card hover
- `like-button-animation`: Heart icon pulse and bounce animation on like/unlike toggle
- `sticker-lightbox`: Full-screen modal overlay that displays a sticker at large size when the sticker image is clicked

### Modified Capabilities
- `sticker-likes`: Like button interaction now includes animation feedback

## Impact

- `apps/albumcito-facilito-app/` — frontend components: sticker cards, album cards, like buttons
- New shared UI components: `<StickerLightbox>`, potentially a `<AnimatedLikeButton>`
- Tailwind CSS v4 utility classes / keyframe animations added to global CSS
- No API changes required
- No breaking changes
