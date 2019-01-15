import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imprint',
  template:`<style>
	  header{
		  text-align: center;
	  }
	  main{
		  display: flex;
		  flex-wrap: wrap;
		  justify-content: space-around;
	  }
	  section{
		  padding: 3rem;
	  }
	  .left{
		  font-size: 1rem;
	  }
  </style><div class="wrapper">
	  <header><h3>Impressum</h3></header>
  </div>
  <mat-divider></mat-divider>
  <main>
	  <section class="left">
		  <mat-card>
			  <mat-card-header>
				  <mat-card-title><a href="https://europeanspallationsource.se/science-support-systems/demax"
				                     style="color: #0094CA; text-decoration: none;">DEMAX Platform</a></mat-card-title>
			  </mat-card-header>
			  <mat-card-content>
				  <table>
					  <tr>
						  <td>European Spallation Source ERIC</td>
					  </tr>
					  <tr>
						  <td>225 92 Lund, Sweden</td>
					  </tr>
					  <tr>
						  <td></td>
					  </tr>
					  <tr>
						  <td> Corporate Identification Number: 768200-0018</td>
						  <td></td>
					  </tr>
					  <tr>
						  <td> VAT number: SE768200001801</td>
						  <td></td>
					  </tr>
					  <tr>
						  <td></td>
						  <td><a mat-button style="background-color: #0094CA; color: white;"
						         href="https://europeanspallationsource.se/legal-ip">ESS Legal & IP</a></td>
					  </tr>
				  </table>
			  </mat-card-content>
		  </mat-card>
	  </section>
	  <section class="right">
		  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2837.249066524862!2d13.245263116258776!3d55.73419038054827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653966760235021%3A0x41552274293bae03!2sEuropean+Spallation+Source!5e1!3m2!1ssv!2sdk!4v1541780776668"
		          width="300" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
	  </section>
  </main>`
})
export class ImprintComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}