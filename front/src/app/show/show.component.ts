import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Web3Service } from '../service/web3.service';
import { APIService } from '../service/api.service';
import Swal from 'sweetalert2'
import * as fleekStorage from '@fleekhq/fleek-storage-js'
import { NgxSummernoteModule } from 'ngx-summernote';
declare var $: any;

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  token:any
  user:any
  ETHaddress:any
  owner:any
  ownername:any
  ownerAvatar:any
  api:any
  COLLECTION:any
  NFTS:any
  collectionName:any
  _story: FormGroup
  config = {
    placeholder:'add story or lyrics here',
    tabsize: 1,
    height: '400px',
    uploadImagePath: '/api/upload',
    toolbar: [
        ['misc', ['codeview', 'undo', 'redo']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }
  constructor(private formBuilder: FormBuilder, private _api: APIService, private web3: Web3Service, private zone: NgZone, private cd: ChangeDetectorRef,private route: ActivatedRoute,private router: Router) {

    this.api = _api
    this.createForm()

  }

  ngOnInit() {

    this.zone.run(() => {

      this.owner = this.route.snapshot.params.user
      this.collectionName = this.route.snapshot.params.collection
      // console.log(this.collectionName)
      this.token = localStorage.getItem('token')
      this.user = localStorage.getItem('user')
      this.ETHaddress = localStorage.getItem('ETHaddress')
      // console.log(this.token,this.user)
      this.cd.detectChanges();
      this.start()
    })

  }

  start():void{

    this.api.SHOW(this.token, this.user,this.owner,this.collectionName)
      .subscribe((jordi: any) => {
        if (jordi.success) {

          this.COLLECTION = jordi.payload[0]
          this.NFTS = this.COLLECTION.nftea
          this.ownername = jordi.ownername
          this.ownerAvatar = jordi.ownerAvatar
          // console.log(this.COLLECTION)

          this._story.controls.story.setValue(this.COLLECTION.story || 'add story or lyrics here')
         // console.log(this.NFTS)
        } else {
          this.pop('error', 'invalid collection')
          // console.log(jordi.payload)

        }
      })

  }

  addStory():void{
    if(!this._story.controls.story.value){
      this.pop('error','whats the story for this collection?')
    }else{

      this.api.ADDSTORY(this.token, this.user,this.collectionName,this._story.controls.story.value)
        .subscribe((jordi: any) => {
          if (jordi.success) {
            this.pop('sucess', 'story updated')
            this.start()

          }else{
            this.pop('error', jordi.message)

          }
        })
    }
  }

  private pop(type,message){
    let title;
    if(type=='error'){
      title = 'Error!'
    }else{
      title = 'Success!'
    }

    Swal.fire({
      title: title,
      text: message,
      icon: type,
      confirmButtonText: 'Close'
    })
  }

createForm(){

  this._story = this.formBuilder.group({

    story: ['', Validators.required],
  });

}

}
