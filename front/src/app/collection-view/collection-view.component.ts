import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Web3Service } from '../service/web3.service';
import { APIService } from '../service/api.service';
import Swal from 'sweetalert2'
import * as fleekStorage from '@fleekhq/fleek-storage-js'
declare var $: any;

@Component({
  selector: 'app-collection',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.css']
})
export class CollectionViewComponent implements OnInit {

  showCreate: boolean
  nftImage: any
  nftImageHash:any
  token:any
  user:any
  ETHaddress:any
  api:any
  _nft: FormGroup
  toFile:any
  COLLECTION:any
  NFT:any
  ARTIST:any
  collectionName:any
  collection:any
  sellCollection:any
  allowCollab:any
  localize:any
  showEdit:boolean
  story = "add story, lyrics or blog here"
config:any
  constructor(private formBuilder: FormBuilder, private _api: APIService, private web3: Web3Service, private zone: NgZone, private cd: ChangeDetectorRef,private route: ActivatedRoute,private router: Router) {

    this.api = _api
    this.showCreate = false
    this.createForm()
  }

  ngOnInit() {

    this.zone.run(() => {

      this.collection = this.route.snapshot.params.id
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

    this.api.gCOLLECTION(this.collection)
      .subscribe((jordi: any) => {
        if (jordi.success) {
          this.zone.run(()=>{
            // console.log(jordi.payload)
            this.COLLECTION = jordi.payload[0]
            this.NFT = this.COLLECTION.nft
            this.story = this.COLLECTION.collection.story
            this.config = {
                value:this.story,
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
            this.cd.detectChanges();
// console.log(this.story)
          })          // console.log(this.NFTS)
        } else {

          this.COLLECTION = []

          console.log(jordi.payload)

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
      this.nftImage = uploadedFile.publicUrl
      this.nftImageHash = uploadedFile.hash
      console.log(uploadedFile)
  }

  addNFT() {

    if (!this._nft.controls.name.value) {
      Swal.fire({
        title: 'Error!',
        text: 'Whats the title of this collection?',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    } else if (!this._nft.controls.description.value) {
      Swal.fire({
        title: 'Error!',
        text: 'Whats the category?',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    } else if (!this._nft.controls.quantity.value) {
      Swal.fire({
        title: 'Error!',
        text: 'Whats the quantity of this NFT?',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }else if (!this._nft.controls.price.value) {
      Swal.fire({
        title: 'Error!',
        text: 'Whats the price of this NFT?',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }else if (!this.nftImage){
      Swal.fire({
        title: 'Error!',
        text: 'Upload NFT image',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    } else {
      // console.log(this._nft.controls.sellCollection.value)
      this.api.ADDNFT(this.token, this.user, this._nft.controls.name.value, this._nft.controls.description.value, this._nft.controls.price.value, this._nft.controls.quantity.value, this.nftImage,this.nftImageHash,this._nft.controls.brewTrue.value,this._nft.controls.brewFalse.value,this._nft.controls.unlockableTrue.value,this._nft.controls.unlockableFalse.value,this.collection)
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

  editCOLLECTION() {

    if (!this._collection.controls.title.value) {
      Swal.fire({
        title: 'Error!',
        text: 'Whats the title of this collection?',
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
    }else if (!this._collection.controls.story.value){
      Swal.fire({
        title: 'Error!',
        text: 'what is the story behind this collection?',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }else {
      // console.log(this._collection.controls.sellCollection.value)
      this.api.ADDCOLLECTION(this.token, this.user, this._collection.controls.title.value, this._collection.controls.description.value,this.sellCollection,this.allowCollab,this.localize,this.collectionName,this._collection.controls.youtube.value,this._collection.controls.soundcloud.value,this._collection.controls.bandlab.value,this._collection.controls.story.value,this._collection.controls.royalties.value)
        .subscribe((jordi: any) => {
          if (jordi.success) {

            this.start()
            this.pop('success', jordi.message)
            this.showCreate = false

          } else {

            this.pop('error', jordi.message)

          }
        })
    }

  }

private setRadio(type:any,value:any){
  if(type=='sellCollection'){
    this.sellCollection = 1
  }else if (type=='allowCollab'){
    this.allowCollab = 1
  }else if (type == 'localize'){
    this.localize = 1

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

  private createForm() {

    this._nft = this.formBuilder.group({

      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      unlockableTrue: ['', Validators.required],
      unlockableFalse: ['', Validators.required],
      brewTrue: ['', Validators.required],
      attribute1name: ['', Validators.required],
      attribute2name: ['', Validators.required],
      attribute3name: ['', Validators.required],
      attribute1value: ['', Validators.required],
      attribute2value: ['', Validators.required],
      attribute3value: ['', Validators.required]

    });

    this._collection = this.formBuilder.group({

      title: ['', Validators.required],
      description: ['', Validators.required],
      youtube: ['', Validators.required],
      soundcloud: ['', Validators.required],
      bandlab: ['', Validators.required],
      sellCollection: ['', Validators.required],
      allowCollab: ['', Validators.required],
      localize: ['', Validators.required],
      story: ['', Validators.required],
      royalties: ['', Validators.required],
      category: ['', Validators.required],

    });

  }
}
