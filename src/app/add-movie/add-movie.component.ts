import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from './../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  @ViewChild('actor') actor: TemplateRef<any>;
  @ViewChild('producer') producer: TemplateRef<any>;

  movieName: string;
  yearOfRelease: string;
  actors: any = [];
  producers: any = [];
  selectedActors = [];
  selectedProducerId: string;
  selectedProducerName: string;
  newActorName : string;
  newProducerName : string;

  constructor(private dataService: DataService, private modal: NgbModal, public toastr: ToastrManager, public route: Router) { }

  ngOnInit() {
    this.getAllActors();
    this.getAllProducers();
    
  }

  
  getAllActors() {
    this.dataService.getAllActors().subscribe((apiResponse: any) => {
      this.actors = apiResponse.data;
    });
  }

  getAllProducers() {
    this.dataService.getAllProducer().subscribe((apiResponse: any) => {
      this.producers = apiResponse.data;
    });
  }
//specify karna zarori nahi hai..wo string ki tarh ja rha h backend pe 
  addActor(actor) {
    if (this.selectedActors.indexOf(actor) === -1) {
    //  console.log('here',actor)
      this.selectedActors.push(actor);
    //  console.log('again',this.selectedActors)
    }
    
   
  }

  addProducer(producer: any) {
  /*   if (this.selectedProducers.indexOf(producer) === -1) {
      this.selectedProducers.push(producer);
    } */
    //console.log(typeof(producer))
    this.selectedProducerId = producer.producerId;
    this.selectedProducerName = producer.producerName;
   // console.log(this.selectedProducers)
    
  }

  showActorModal(){
    this.modal.open(this.actor, { size: 'sm' });
  }
  showproducerModal(){
    this.modal.open(this.producer, { size: 'sm' });
  }

  addNewActor() {  
    this.dataService.addNewActor(this.newActorName).subscribe((apiResponse) => {
        if(apiResponse.status ===  200) {         
          this.getAllActors()
          this.toastr.successToastr('Actor added')
        }
      }) 
    }
   
    addNewProducer() {  
      this.dataService.addNewProducer(this.newProducerName).subscribe((apiResponse) => {
          if(apiResponse.status ===  200) {         
            this.getAllProducers()
            this.toastr.successToastr('producer added')
          }
        }) 
      }


     addNewMovie() {
        let data = {
          movieName: this.movieName,
          yearOfRelease: this.yearOfRelease,
          producerName: this.selectedProducerName,
          actors: this.selectedActors
        }
       
        this.dataService.addNewMovie(data).subscribe((apiResponse) => {
          if(apiResponse.status === 200){
            this.toastr.successToastr("movie added");
            this.route.navigate(['/'])
          } else {
            this.toastr.errorToastr(apiResponse.message)
          }
        }, (error) => {
          this.toastr.errorToastr(error.message)
        })
     }
  

}
