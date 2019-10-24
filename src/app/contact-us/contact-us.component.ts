import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    this.contactForm = fb.group({
      'name': [null, Validators.required],
      'email': [null, Validators.email],
      'message': [null, Validators.required],
      'website': [null]
    })
  }

  userSubmittedForm: any
  contactForm: FormGroup
  name: string = ''
  email: string = ''
  message: string = ''
  website: string = ''

  ngOnInit() {
  }

  addResponse(userSubmittedForm) {
    console.log('You submitted the following form: ',userSubmittedForm)
    this.name = userSubmittedForm.name
    this.email=userSubmittedForm.email
    this.message=userSubmittedForm.message
    this.website=userSubmittedForm.website
  }

}
