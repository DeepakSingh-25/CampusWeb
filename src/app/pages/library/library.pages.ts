import { LibraryBookSearchPage } from './book-search/book-search.component';
import { LibraryBooksPage } from './books/books.component';
import { LibraryIssueReturnPage } from './issue-return/issue-return.component';
import { LibraryReservationsPage } from './reservations/reservations.component';
import { LibraryFinesPage } from './fines/fines.component';
import { LibraryMembersPage } from './members/members.component';
import { LibrarySetupPage } from './setup/setup.component';
import { LibraryLibrariesPage } from './libraries/libraries.component';
import { LibraryCategoriesPage } from './categories/categories.component';
import { LibraryRacksShelvesPage } from './racks-shelves/racks-shelves.component';
import { LibraryReportsPage } from './reports/reports.component';

export const LibraryPages = {
  "Book Search": LibraryBookSearchPage,
  "Books": LibraryBooksPage,
  "Issue / Return": LibraryIssueReturnPage,
  "Reservations": LibraryReservationsPage,
  "Fines": LibraryFinesPage,
  "Members": LibraryMembersPage,
  "Setup": LibrarySetupPage,
  "Libraries": LibraryLibrariesPage,
  "Categories": LibraryCategoriesPage,
  "Racks & Shelves": LibraryRacksShelvesPage,
  "Reports": LibraryReportsPage
};
