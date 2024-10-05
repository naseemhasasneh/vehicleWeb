import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
@Component({
  selector: 'app-vehicle-make',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatGridListModule,
    MatAutocompleteModule
  ],
  templateUrl: './vehicle-make.component.html',
  styleUrl: './vehicle-make.component.css'
})
export class VehicleMakeComponent implements OnInit {
  makes: any[] = [];
  selectedMakeId: number | null = null;
  selectedYear: number = new Date().getFullYear();
  filteredMakes?: any[]=[];
  makeControl = new FormControl(); // FormControl for input
  @ViewChild('input') input?: ElementRef<HTMLInputElement>;

  @Output() makeSelected = new EventEmitter<{ makeId: number, year: number }>();

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getAllMakes().subscribe((data) => {
      this.makes = data.results;
    });
    this.filteredMakes = this.makes.slice();
  }

   filter(value?: string): void {
    const filterValue = this.input?.nativeElement.value.toLowerCase();
    this.filteredMakes = this.makes.filter(o => o.make_Name.toLowerCase().includes(filterValue));
  }
  onMakeSelect(): void {
    if (this.selectedMakeId) {
      this.makeSelected.emit({ makeId: this.selectedMakeId, year: this.selectedYear });
    }
  }

   // Display the selected car make name in the input
   displayMakeName(make: any): string {
    return make ? make.make_Name : '';
  }
}
