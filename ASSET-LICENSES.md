# Website asset provenance

All fonts and icons are served locally. Brand marks identify integrations; no endorsement is implied.

- Anton 5.3.0 and Inter 5.3.0: Fontsource packages, SIL Open Font License. Original license text retained under `site/assets/fonts/`. [Anton source](https://fontsource.org/fonts/anton), [Inter source](https://fontsource.org/fonts/inter).
- Phosphor core 2.1.1: unmodified regular SVG icons, MIT license retained under `site/assets/icons/`. [Source](https://github.com/phosphor-icons/core).
- Brand assets: `@iconify-json/logos` 1.2.15. SVG path data is copied from the named library assets (Slack, AWS, GitHub, Claude, OpenAI, Cursor, Linear, Jira, Asana), with their original dimensions. [Source](https://github.com/iconify/icon-sets/tree/master/json/logos.json). Brand/trademark rights remain with their owners.
- Motion 14.0.0: browser distribution, MIT license retained under `site/assets/vendor/`. [Source](https://github.com/motiondivision/motion).

The generated design mock is a visual reference, not a website image asset or evidence of a product run. The Slack workflow is illustrative. The export diff, synthetic CSV values and source/mock check outcomes are clearly labelled illustrations. Historical benchmark artifacts are separate and linked from the documentation; illustrative values are not recorded evidence.

## Editable system diagrams

Original diagram content derived from inspected AgentX mainline and the approved site story. Editable Excalidraw JSON lives in docs/diagrams; static SVG exports live in site/assets/diagrams. Official renderer: @excalidraw/excalidraw 0.18.0 (MIT), used only during local asset production. Website visitors do not download that renderer. Excalidraw diagram skill guidance: https://github.com/coleam00/excalidraw-diagram-skill (reviewed 2026-10-05). The rendered overview is included; its provenance is documented below.

## Recorded benchmark

The Django validator patch context is BSD-3-Clause; the complete official Django license is retained in `site/assets/evidence/django-11099/Django-LICENSE.txt`, retrieved from upstream commit d26b2424437dabeeca94d7900b37d2df4410da0c. The patch, harness output, and report are saved AgentX evaluation artifacts, with hashes and qualified provenance. Request text is a derived summary. Django is identified as the benchmark repository, not a customer or endorser. No launch capability, private endpoint, storage identifiers, or full transcript is included.

## Rendered overview

`site/assets/video/rovara-overview.mp4`: local 20-second composition produced with Brag and Hyperframes 0.8.134. It uses an original locally synthesized ambient score and three accents from two Kenney CC0 samples distributed by Brag (`impactSoft_medium_001.ogg`, `impactSoft_medium_004.ogg`). No third-party music track or voice service is used. Inter and Phosphor licenses remain above; GSAP 3.14.2 is used for local rendering with its original header and standard-license notice preserved in the editable production bundle. The video includes actual Django patch context under its retained BSD-3-Clause license. Vendor marks identify connections, not endorsement.

Primary workflow sources: https://github.com/latent-spaces/brag and https://github.com/heygen-com/hyperframes. The standalone editable composition and detailed check/render evidence are preserved in the local research bundle. The shipped MP4 has no framework or animation-runtime dependency.


## Generated illustrative people (2026-10-14)

`site/assets/story/maya.png` and `sam.png` were created using the built-in ImageGen tool for this redesign. Subjects are fictional illustrative participants, not customers or endorsers. The original portrait generations are preserved; production copies are 256×256. Maya SHA-256: `7ad3b2ccfd917a5a80bd3c1fb9b3a0bf40f24b438ee711537253698069115fcf`. Sam SHA-256: `f681a5625aa799efdeed643d05fa45909588b8f721c318770f9d6f59fe828ebe`.
