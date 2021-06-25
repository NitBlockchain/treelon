import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Web3Service } from '../service/web3.service';
import { APIService } from '../service/api.service';
import Swal from 'sweetalert2'
import * as fleekStorage from '@fleekhq/fleek-storage-js'
declare var $: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  showCreate: boolean
  showCreateNFT: boolean
  collectionImage: any
  collectionImageHash:any
  nftImage: any
  token:any
  user:any
  ETHaddress:any
  api:any
  _collection: FormGroup
  _nft: FormGroup
  toFile:any
  COLLECTION:any
  constructor(private formBuilder: FormBuilder, private _api: APIService, private web3: Web3Service, private zone: NgZone, private cd: ChangeDetectorRef) {

    this.api = _api
    this.showCreate = false
    this.createForm()
  }

  ngOnInit() {

    this.zone.run(() => {
      this.token = localStorage.getItem('token')
      this.user = localStorage.getItem('user')
      this.ETHaddress = localStorage.getItem('ETHaddress')
      // console.log(this.token,this.user)
      this.cd.detectChanges();
      this.start()
    })

  }

  start():void{

    this.api.START(this.token, this.user)
      .subscribe((jordi: any) => {
        if (jordi.success) {
          this.zone.run(()=>{
            //console.log(jordi.payload)
            this.COLLECTION = jordi.payload[0].collection
            this.cd.detectChanges();

          })

        } else {
          this.pop('error','session expired, log ind')
          localStorage.clear();

          // console.log(jordi.payload)

        }
      })

  }

  async upload(event:any){


    this.toFile = event.target.files[0]
    // console.log(this.toFile)
      const uploadedFile:any = await fleekStorage.upload({
        apiKey: '9awTREd079A7DCx8y3jRNw==',
        apiSecret: 'TgU5UH5txwXJip97iSx291hB8qjQs3+02rotobGERkc=',
        key: this.toFile.name,
        data: this.toFile,
      })
      this.collectionImage = uploadedFile.publicUrl
      this.collectionImageHash = uploadedFile.hash
      // console.log(uploadedFile)
  }

  addCollection() {

    if (!this._collection.controls.name.value) {
      Swal.fire({
        title: 'Error!',
        text: 'Whats the name of this collection?',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    } else if (!this._collection.controls.description.value) {
      Swal.fire({
        title: 'Error!',
        text: 'Whats the details of this collection?',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }else if (!this._collection.controls.category.value){

      Swal.fire({
        title: 'Error!',
        text: 'Whats the category?',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }else if (!this.collectionImage){
      Swal.fire({
        title: 'Error!',
        text: 'Add cover image for your collection',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    } else {

      this.api.ADDCOLLECTION(this.token, this.user, this._collection.controls.name.value, this._collection.controls.description.value,this._collection.controls.category.value, this.collectionImage,this.collectionImageHash,this._collection.controls.youtube.value,this._collection.controls.soundcloud.value,this._collection.controls.bandlab.value)
        .subscribe((jordi: any) => {
          if (jordi.success) {

            this.start()
            this.pop('success', jordi.message)

          } else {

            this.pop('error', jordi.message)

          }
        })
    }

  }
  addNFTEA() {

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

  private createForm() {

    this._collection = this.formBuilder.group({

      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      youtube: ['', Validators.required],
      soundcloud: ['', Validators.required],
      bandlab: ['', Validators.required],

    });


  }
}
