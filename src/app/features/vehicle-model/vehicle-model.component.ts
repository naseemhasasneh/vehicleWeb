import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-model',
  standalone: true,
  imports: [ 
   
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatGridListModule

  ],
  templateUrl: './vehicle-model.component.html',
  styleUrl: './vehicle-model.component.css'
})
export class VehicleModelComponent implements OnChanges {
  @Input() selectedMakeId: number | null = null;
  @Input() selectedYear: number | null = null;

  vehicleTypes: any[] = [];
  models: any[] = [];
  displayedVehicleColumns: string[] = ['vehicleTypeName'];
  displayedModelColumns: string[] = ['modelName'];

  filteredVehicleTypes = new MatTableDataSource<any>([]);
  filteredModels = new MatTableDataSource<any>([]);
  @ViewChild('paginatorTypes',{static: false}) vehicleTypePaginator!: MatPaginator;
  @ViewChild('paginatorModels',{static: false}) modelPaginator!: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort!: MatSort;
  constructor(private vehicleService: VehicleService) {}

  ngOnChanges(): void {
    if (this.selectedMakeId && this.selectedYear) {
      // Fetch vehicle types
      this.vehicleService.getVehicleTypesForMakeId(this.selectedMakeId).subscribe((data) => {
        this.vehicleTypes = data.results;
        this.filteredVehicleTypes = new MatTableDataSource(this.vehicleTypes);
        setTimeout(()=>this.filteredVehicleTypes.paginator = this.vehicleTypePaginator);
        this.filteredVehicleTypes.sort = this.sort;
      });

      // Fetch models
      this.vehicleService.getModelsForMakeIdYear(this.selectedMakeId, this.selectedYear).subscribe((data) => {
        this.models = data.results;
        this.filteredModels = new MatTableDataSource(this.models);
        setTimeout(()=> this.filteredModels.paginator = this.modelPaginator);  
        this.filteredModels.sort = this.sort;
      });
    }
  }

  applyVehicleTypeFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredVehicleTypes.filter = filterValue.trim().toLowerCase();
  }

  applyModelFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredModels.filter = filterValue.trim().toLowerCase();
  }
}
