import { Component, Input } from '@angular/core';
import { Book } from '../../interfaces/book.interface';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  @Input({required:true}) book! : Book;
}
