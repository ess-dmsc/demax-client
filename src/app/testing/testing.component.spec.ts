import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TestingComponent } from "./testing.component";
import { MaterialModule } from "../external/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("TestingComponent", () => {
  let component: TestingComponent;
  let fixture: ComponentFixture<TestingComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestingComponent],
      providers: [{ provide: HttpClient }, { provide: Router }, {provide: JwtHelperService}],
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
