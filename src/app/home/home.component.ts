import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from './../data.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('edit') edit: TemplateRef<any>;
  movies = [];

  fetchedMovie: any;
  movieId:string;
  movieName: string;
  yearOfRelease: number;
  actors = [];
  producerId: string;
  producerName: string;
  producers: any;
  selectedActors = [];

  constructor(private dataService: DataService, private router: Router, public modal: NgbModal, public toastr: ToastrManager) { }

  ngOnInit() {
    this.getMovies();
    this.getAllActors();
    this.getAllProducers()
  }

  getMovies() {
    this.movies = [];
    this.dataService.getAllMovies().subscribe((apiResponse) => {
       if(apiResponse.status === 200) {
        this.movies = apiResponse.data;
       }
    });
  }

  addNewMovie() {
      this.router.navigate(['/add-movie']);
  }

  editMovie(movie: any) {
  
    this.dataService.getSingleMovie(movie.movieId).subscribe((apiResponse) => {
     if(apiResponse.status === 200) {
      this.movieId= apiResponse.data.movieId,
      this.movieName = apiResponse.data.movieName
      this.yearOfRelease = apiResponse.data.yearOfRelease
      this.producerId = apiResponse.data.producerId
      this.producerName = apiResponse.data.producerName
      this.actors = apiResponse.data.actors
     } else {
       this.toastr.errorToastr(`${apiResponse.message}`)
     }
    }, (error) => {
      this.toastr.errorToastr(error.message)
    })
    this.modal.open(this.edit, { size: 'lg' });
  }

  updateMovie() {
    let data = {
      movieId: this.movieId,
      movieName: this.movieName,
      yearOfRelease: this.yearOfRelease,
      producerName: this.producerName,
      producerId: this.producerId,
      actors: this.actors
    }
    // // console.log(data)
    this.dataService.updateMovie(data).subscribe((apiResponse) => {
      if(apiResponse.status === 200) {
        this.toastr.successToastr(`${apiResponse.message}`)
        this.getMovies()
        this.router.navigate(['/'])
      } else {
        this.toastr.errorToastr(`${apiResponse.message}`)
      }
    }, (err) => {
      this.toastr.errorToastr(`${err.message}`)
    })
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
  addActor(actor) {
    if (this.selectedActors.indexOf(actor) === -1) {
    //  // console.log('here',actor)
      this.selectedActors.push(actor);
      // console.log('again',this.selectedActors)
    }   
   
  }

  deleteMovie(movie: any){
    // console.log(movie)
    this.dataService.deleteMovie(movie.movieId).subscribe((apiResponse: any) => {
      if(apiResponse.status === 200) {
        this.toastr.successToastr('deleted')
        //this.router.navigate(['/'])
        this.getMovies()
      } else {
        this.toastr.errorToastr(apiResponse.message)
      }
    }, (err) => {
      this.toastr.errorToastr(`${err.message}`)
    })
  }
  
}
