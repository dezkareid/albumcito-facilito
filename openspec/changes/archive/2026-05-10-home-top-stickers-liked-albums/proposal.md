## Why

The home page currently lacks discovery features, making it hard for users to find popular stickers or albums that other collectors enjoy. Adding a "Top Stickers" and "Most Liked Albums" section creates social proof and encourages users to engage, complete their albums, and return to the app.

## What Changes

- Add a **Top Stickers** section to the home page displaying the most collected/liked stickers across all users
- Add a **Most Liked Albums** section to the home page showing albums with the highest engagement
- Introduce a `likes` concept allowing users to like stickers and albums
- Expose new API endpoints to aggregate and return top stickers and liked albums

## Capabilities

### New Capabilities
- `home-top-stickers`: Displays the most popular stickers on the home page ranked by collection frequency or likes
- `home-liked-albums`: Displays the most liked albums on the home page ranked by like count
- `sticker-likes`: Allows users to like individual stickers and tracks like counts per sticker
- `album-likes`: Allows users to like albums and tracks like counts per album

### Modified Capabilities
<!-- No existing specs require behavioral changes -->

## Impact

- **Frontend** (`apps/albumcito-facilito-app/`): New home page sections/components, API client calls for top stickers and liked albums
- **Backend** (`apis/albumcito-facilito-api/`): New endpoints (`GET /stickers/top`, `GET /albums/liked`, `POST /stickers/:id/like`, `POST /albums/:id/like`) and like tracking logic
- **Data**: New `likes` table or field on stickers/albums entities; aggregation queries for ranking
- **No breaking changes** to existing endpoints
