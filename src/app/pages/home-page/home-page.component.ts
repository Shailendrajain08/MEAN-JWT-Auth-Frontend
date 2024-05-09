import { Component, inject, OnInit } from '@angular/core';
import { BookServiceService } from '../../services/book-service.service';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export default class HomePageComponent implements OnInit {
  
  private bookService = inject(BookServiceService)
  book : Book[] = [];
  ngOnInit(): void {
    this.getBooks()
  }

  getBooks () {
    this.bookService.getBooks().subscribe({
      next:(res)=> {
        this.book = res.data
      }
    });
  }

}
