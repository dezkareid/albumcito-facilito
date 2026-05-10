## ADDED Requirements

### Requirement: Like button plays pulse animation on activation
The system SHALL play a heart pulse/bounce keyframe animation on the `LikeButton` icon immediately when the user clicks to like.

#### Scenario: Heart pulses on like
- **WHEN** a user clicks the like button to add a like
- **THEN** the heart icon SHALL play a scale pulse (grow then shrink back) animation lasting ≤ 400 ms

#### Scenario: Pulse does not replay on re-render
- **WHEN** the component re-renders after the like API call resolves
- **THEN** the animation SHALL NOT replay; only the filled/colored state is shown

#### Scenario: No animation with reduced-motion preference
- **WHEN** the user's OS has `prefers-reduced-motion: reduce` set
- **THEN** the heart icon SHALL change state without animation

### Requirement: Like button plays a shrink animation on deactivation
The system SHALL play a brief shrink/deflate animation when the user clicks to unlike.

#### Scenario: Heart shrinks on unlike
- **WHEN** a user clicks the like button to remove a like
- **THEN** the heart icon SHALL play a quick scale-down then return animation lasting ≤ 300 ms

#### Scenario: No animation with reduced-motion preference
- **WHEN** the user's OS has `prefers-reduced-motion: reduce` set
- **THEN** the heart icon SHALL change state without animation
