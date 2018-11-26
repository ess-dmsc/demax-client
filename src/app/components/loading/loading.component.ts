import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-loading',
	template:`
		<style>
			.dot {
				position: absolute;
				top: 50%;
				left: 50%;
				width: 25px;
				height: 25px;
				border-radius: 50%;
				background-color: #0094CA;
				z-index: 0;
				opacity: 1;
				animation-name: effect-3;
				animation-duration: 5s, 2s;
				animation-iteration-count: infinite;
				animation-timing-function: ease, linear;
			}

			.wrapper::before {
				content: "";
				position: absolute;
				top: 50%;
				left: 50%;
				margin: -65px 0 0 -65px;
				width: 150px;
				height: 150px;
				border-radius: 50%;
				opacity: 1;
				z-index: 1
			}

			.wrapper::after {
				content: "";
				position: absolute;
				top: 50%;
				left: 50%;
				margin: -65px 0 0 -65px;
				width: 150px;
				height: 150px;
				border-radius: 50%;
				opacity: 1;
				z-index: 2;
			}

			.wrapper::after,
			.wrapper::before {
				border: 2px solid #0094CA;
			}

			.wrapper::after {
				animation-name: effect-3, effect-1;
				animation-duration: 5s, 2s;
				animation-iteration-count: infinite;
				animation-timing-function: ease, linear;
			}

			.wrapper::before {
				animation-name: effect-3, effect-2;
				animation-duration: 5s, 2s;
				animation-iteration-count: infinite;
				animation-timing-function: ease, linear;
			}

			@keyframes effect-1 {
				0% {
					transform: perspective(1000px) rotate3d(1, 1, 1, 0deg)
				}
				100% {
					transform: perspective(1000px) rotate3d(1, 1, 1, 360deg)
				}
			}

			@keyframes effect-2 {
				0% {
					transform: perspective(1000px) rotate3d(1, -1, 1, 0deg)
				}
				100% {
					transform: perspective(1000px) rotate3d(1, -1, 1, 360deg)
				}
			}

			@keyframes effect-3 {
				0%,
				100% {
					opacity: 0
				}
				25%,
				75% {
					opacity: 1
				}
			}
		</style>
		<div class="wrapper" *ngIf="condition">
			<div class="dot"></div>
		</div>
	`
})
export class LoadingComponent {
	@Input() condition: boolean;
}