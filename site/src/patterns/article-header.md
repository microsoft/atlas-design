---
title: Article Header
description: The Article Header pattern in the Atlas Design System
template: standard
---

# Article Header

The article header pattern is used to display a combinations of overflow menus, breadcrumbs, and page-related actions. It provides a width-flexible space to display information useful to a particular article page or view. It features both the `.breadcrumbs` and `.popover` components, and is composed by Atlas's flex atomics.

Please note that, when dealing with a variable amount of breadcrumbs, you'll need to implement some sort of truncation behavior for them.

```html
<div class="display-flex align-items-center">
	<details class="popover">
		<summary class="button button-clear button-primary">
			<span class="visually-hidden">Example button</span>
			<span class="icon">
				<svg width="21" height="21" fill="none">
					<rect width="10" height="10" class="fill-current-color"></rect>
					<rect x="11" width="10" height="10" class="fill-current-color"></rect>
					<rect y="11" width="10" height="10" class="fill-current-color"></rect>
					<rect x="11" y="11" width="10" height="10" class="fill-current-color"></rect>
				</svg>
			</span>
		</summary>
		<ul class="popover-content">
			<nav aria-label="popover navigation">
				<ul>
					<li class="margin-bottom-sm"><a href="#">Domain</a></li>
					<li class="margin-bottom-sm"><a href="#">Kingdom</a></li>
					<li class="margin-bottom-sm"><a href="#">Phylum</a></li>
				</ul>
			</nav>
		</ul>
	</details>
	<div class="overflow-hidden padding-block-sm flex-grow-1 margin-right-lg">
		<nav aria-label="breadcrumb navigation">
			<ol class="breadcrumbs margin-none breadcrumbs-initial-slash">
				<li class="breadcrumbs-item"><a href="#">Genus</a></li>
				<li class="breadcrumbs-item"><a href="#">Species</a></li>
				<li class="breadcrumbs-item"><a href="#">Genus</a></li>
			</ol>
		</nav>
	</div>
	<div class="display-flex flex-wrap-no-wrap margin-left-auto">
		<button
			class="button button-clear button-primary"
			aria-label="Example button in article header 1"
		>
			<span class="icon" aria-hidden="true">
				<svg width="16" height="16" fill="none">
					<path
						class="fill-current-color"
						d="M8.5 10a1.5 1.5 0 0 1 1.5 1.5v.5c0 1.971-1.86 4-5 4-3.14 0-5-2.029-5-4v-.5A1.5 1.5 0 0 1 1.5 10h7Zm0 1h-7a.5.5 0 0 0-.5.5v.5c0 1.438 1.432 3 4 3s4-1.562 4-3v-.5a.5.5 0 0 0-.5-.5ZM5 3.5A2.75 2.75 0 1 1 5 9a2.75 2.75 0 0 1 0-5.5ZM14 0a2 2 0 0 1 1.995 1.85L16 2v2a2 2 0 0 1-1.85 1.995L14 6h-1.501l-1.198 1.6c-.53.706-1.604.42-1.777-.376l-.017-.111L9.5 7 9.5 5.935l-.078-.02a2.003 2.003 0 0 1-1.397-1.6l-.02-.166L8 4V2A2 2 0 0 1 9.85.005L10 0h4ZM5 4.5A1.75 1.75 0 1 0 5 8a1.75 1.75 0 0 0 0-3.5ZM14 1h-4a1 1 0 0 0-.993.883L9 2v2a1 1 0 0 0 .883.993L10 5h.5v2L12 5h2a1 1 0 0 0 .993-.883L15 4V2a1 1 0 0 0-.883-.993L14 1Z"
					></path>
				</svg>
			</span>
		</button>
		<button
			class="button button-clear button-primary"
			aria-label="Example button in article header 2"
		>
			<span class="icon" aria-hidden="true">
				<svg width="18" height="17" fill="none">
					<path
						class="fill-current-color"
						d="M14.5 5a2.5 2.5 0 0 1 2.494 2.336L17 7.5v.757a5.506 5.506 0 0 0-1-.657v-.1a1.5 1.5 0 0 0-1.356-1.493L14.5 6h-6a1.5 1.5 0 0 0-1.493 1.356L7 7.5v6a1.5 1.5 0 0 0 1.355 1.493L8.5 15h.1c.182.357.403.693.657 1H8.5a2.5 2.5 0 0 1-2.495-2.336L6 13.5v-6a2.5 2.5 0 0 1 2.336-2.495L8.5 5h6Zm-2.838-3.305.047.157L12.286 4h-1.036l-.506-1.889A1.5 1.5 0 0 0 9.048 1.02l-.142.03-5.795 1.553A1.5 1.5 0 0 0 2.02 4.3l.03.142 1.553 5.795A1.5 1.5 0 0 0 5 11.347v1a2.502 2.502 0 0 1-2.31-1.682l-.053-.17-1.552-5.796a2.5 2.5 0 0 1 1.61-3.014l.157-.047L8.648.085a2.5 2.5 0 0 1 2.957 1.458l.057.152ZM18 12.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-4-2a.5.5 0 0 0-1 0V12h-1.5a.5.5 0 0 0 0 1H13v1.5a.5.5 0 0 0 1 0V13h1.5a.5.5 0 0 0 0-1H14v-1.5Z"
					></path>
				</svg>
			</span>
		</button>
		<button
			class="button button-clear button-primary 3"
			aria-label="Example button in article header"
		>
			<span class="icon" aria-hidden="true">
				<svg width="20" height="20" fill="none">
					<path
						class="fill-current-color"
						clip-rule="evenodd"
						d="M13.323 10.29a9.783 9.783 0 0 0-3.927.81 10.29 10.29 0 0 0-3.3 2.287v-1.032c0-.667.087-1.308.259-1.924a7.227 7.227 0 0 1 1.859-3.185 7.226 7.226 0 0 1 3.185-1.859 7.112 7.112 0 0 1 1.924-.258V2.032L19 7.71l-5.677 5.677V10.29Zm1.032 4.13 1.032-1.033v3.097H3V6.16h1.032v9.29h10.323V14.42ZM13.29 6.17c.264-.006.546-.009.847-.009h.218V4.524L17.54 7.71l-3.185 3.185V9.258h-1.032c-1.086 0-2.143.153-3.17.46-1.027.306-1.992.76-2.895 1.363a6.02 6.02 0 0 1 .48-1.416c.218-.449.484-.865.798-1.25A6.171 6.171 0 0 1 9.61 7.387c.4-.301.835-.548 1.302-.742.29-.118.565-.21.823-.278.258-.067.516-.116.774-.145.258-.03.519-.047.782-.053Z"
					></path>
				</svg>
			</span>
		</button>
		<details class="popover popover-right">
			<summary
				class="button button-clear button-primary"
				aria-label="Example button in .article-header-actions > .button"
			>
				<span class="icon" aria-hidden="true">
					<svg width="2" height="15" fill="none">
						<path
							class="fill-current-color"
							d="M1 12.823a.942.942 0 0 1 .703.297.942.942 0 0 1 .297.703.97.97 0 0 1-.078.39 1.031 1.031 0 0 1-.531.532.969.969 0 0 1-.391.078.969.969 0 0 1-.39-.078 1.105 1.105 0 0 1-.32-.211 1.104 1.104 0 0 1-.212-.32.969.969 0 0 1-.078-.391.97.97 0 0 1 .29-.703.969.969 0 0 1 .71-.297Zm0-6a.941.941 0 0 1 .703.297.941.941 0 0 1 .297.703.97.97 0 0 1-.078.39 1.03 1.03 0 0 1-.531.532.97.97 0 0 1-.391.078.97.97 0 0 1-.39-.078 1.104 1.104 0 0 1-.32-.211 1.104 1.104 0 0 1-.212-.32A.969.969 0 0 1 0 7.822a.969.969 0 0 1 .29-.703.97.97 0 0 1 .71-.297Zm0-4a.97.97 0 0 1-.39-.078 1.104 1.104 0 0 1-.32-.211 1.104 1.104 0 0 1-.212-.32A.969.969 0 0 1 0 1.822a.969.969 0 0 1 .29-.703A.969.969 0 0 1 1 .823a.941.941 0 0 1 .703.297.941.941 0 0 1 .297.703.97.97 0 0 1-.078.39 1.03 1.03 0 0 1-.531.532.97.97 0 0 1-.391.078Z"
						></path>
						<path
							d="m1.703 13.12-.363.343.01.01.01.01.343-.363Zm0 1.414-.353-.354.353.354Zm-1.414 0-.363.343.01.01.01.01.343-.363Zm0-1.414.354.353-.354-.353Zm1.414-6-.363.343.01.01.01.01.343-.363Zm0 1.414L1.35 8.18l.353.354Zm-1.414 0-.363.343.01.01.01.01.343-.363Zm0-1.414.354.353-.354-.353Zm0-4.586-.363.343.01.01.01.01.343-.363Zm0-1.414.354.353-.354-.353Zm1.414 0-.363.343.01.01.01.01.343-.363ZM1 13.323a.47.47 0 0 1 .191.036l.399-.917a1.47 1.47 0 0 0-.59-.12v1Zm.191.036c.059.026.107.06.149.104l.727-.687a1.442 1.442 0 0 0-.477-.334l-.399.917Zm.169.124c.044.042.078.09.103.149l.917-.4a1.441 1.441 0 0 0-.334-.476l-.686.727Zm.103.149a.47.47 0 0 1 .037.19h1c0-.203-.038-.402-.12-.59l-.917.4Zm.037.19a.47.47 0 0 1-.037.192l.917.399c.082-.188.12-.386.12-.59h-1Zm-.037.192a.53.53 0 0 1-.113.166l.707.707a1.53 1.53 0 0 0 .323-.474l-.917-.399Zm-.113.166a.503.503 0 0 1-.159.106l.399.917c.175-.076.332-.181.467-.316l-.707-.707Zm-.159.106a.47.47 0 0 1-.191.037v1c.204 0 .403-.038.59-.12l-.399-.917ZM1 14.323a.47.47 0 0 1-.191-.037l-.399.917c.187.082.386.12.59.12v-1Zm-.191-.037a.605.605 0 0 1-.177-.116l-.686.727c.136.129.292.231.464.306l.399-.917Zm-.156-.096a.604.604 0 0 1-.116-.176l-.917.399c.074.172.177.328.306.464l.727-.687Zm-.116-.176a.47.47 0 0 1-.037-.191h-1c0 .204.038.402.12.59l.917-.399ZM.5 13.823a.47.47 0 0 1 .037-.191l-.917-.4c-.082.188-.12.387-.12.59h1Zm.037-.191a.503.503 0 0 1 .106-.159l-.707-.707c-.135.135-.24.292-.316.467l.917.399Zm.106-.159a.53.53 0 0 1 .166-.114l-.399-.917a1.53 1.53 0 0 0-.474.324l.707.707Zm.166-.114A.47.47 0 0 1 1 13.323v-1a1.47 1.47 0 0 0-.59.12l.399.916ZM1 7.323a.47.47 0 0 1 .191.036l.399-.917a1.469 1.469 0 0 0-.59-.12v1Zm.191.036c.059.026.107.06.149.104l.727-.687a1.442 1.442 0 0 0-.477-.334l-.399.917Zm.169.124c.044.042.078.09.103.148l.917-.398a1.441 1.441 0 0 0-.334-.477l-.686.727Zm.103.148a.47.47 0 0 1 .037.192h1c0-.204-.038-.403-.12-.59l-.917.398Zm.037.192a.47.47 0 0 1-.037.191l.917.399c.082-.188.12-.386.12-.59h-1Zm-.037.191a.53.53 0 0 1-.113.166l.707.707a1.53 1.53 0 0 0 .323-.474l-.917-.399Zm-.113.166a.502.502 0 0 1-.159.106l.399.917c.175-.076.332-.18.467-.316L1.35 8.18Zm-.159.106A.47.47 0 0 1 1 8.323v1c.204 0 .403-.038.59-.12l-.399-.917ZM1 8.323a.47.47 0 0 1-.191-.037l-.399.917c.187.082.386.12.59.12v-1Zm-.191-.037a.604.604 0 0 1-.177-.116l-.686.727c.136.129.292.231.464.306l.399-.917ZM.653 8.19a.604.604 0 0 1-.116-.176l-.917.399c.074.172.177.328.306.464l.727-.687Zm-.116-.176A.47.47 0 0 1 .5 7.823h-1c0 .204.038.402.12.59l.917-.399ZM.5 7.823a.47.47 0 0 1 .037-.192l-.917-.398c-.082.187-.12.386-.12.59h1Zm.037-.192a.503.503 0 0 1 .106-.158l-.707-.707c-.135.135-.24.292-.316.467l.917.398Zm.106-.158a.53.53 0 0 1 .166-.114L.41 6.442a1.53 1.53 0 0 0-.474.324l.707.707Zm.166-.114A.47.47 0 0 1 1 7.323v-1c-.204 0-.403.038-.59.12l.399.916ZM1 2.323a.47.47 0 0 1-.191-.037l-.399.917c.187.082.386.12.59.12v-1Zm-.191-.037a.603.603 0 0 1-.177-.116l-.686.727c.136.129.292.231.464.306l.399-.917ZM.653 2.19a.604.604 0 0 1-.116-.176l-.917.399c.074.172.177.328.306.464l.727-.687Zm-.116-.176A.47.47 0 0 1 .5 1.823h-1c0 .204.038.402.12.59l.917-.399ZM.5 1.823a.47.47 0 0 1 .037-.192l-.917-.398c-.082.187-.12.386-.12.59h1Zm.037-.192a.503.503 0 0 1 .106-.158L-.064.766c-.135.135-.24.292-.316.467l.917.398Zm.106-.158a.53.53 0 0 1 .166-.114L.41.442a1.53 1.53 0 0 0-.474.324l.707.707Zm.166-.114A.47.47 0 0 1 1 1.323v-1C.796.323.597.36.41.443l.399.916ZM1 1.323a.47.47 0 0 1 .191.036L1.59.442A1.469 1.469 0 0 0 1 .322v1Zm.191.036c.059.026.107.06.149.104l.727-.687A1.441 1.441 0 0 0 1.59.442l-.399.917Zm.169.124c.044.042.078.09.103.148l.917-.398a1.441 1.441 0 0 0-.334-.477l-.686.727Zm.103.148a.47.47 0 0 1 .037.192h1c0-.204-.038-.403-.12-.59l-.917.398Zm.037.192a.47.47 0 0 1-.037.191l.917.399c.082-.188.12-.386.12-.59h-1Zm-.037.191a.53.53 0 0 1-.113.166l.707.707a1.53 1.53 0 0 0 .323-.474l-.917-.399Zm-.113.166a.502.502 0 0 1-.159.106l.399.917c.175-.076.332-.18.467-.316L1.35 2.18Zm-.159.106A.47.47 0 0 1 1 2.323v1c.204 0 .403-.038.59-.12l-.399-.917Z"
						></path>
					</svg>
				</span>
			</summary>
			<ul class="popover-content">
				<nav aria-label="popover-right-nav">
					<ul>
						<li class="margin-bottom-sm"><a href="#">Domain</a></li>
						<li class="margin-bottom-sm"><a href="#">Kingdom</a></li>
						<li class="margin-bottom-sm"><a href="#">Phylum</a></li>
					</ul>
				</nav>
			</ul>
		</details>
	</div>
</div>
```
