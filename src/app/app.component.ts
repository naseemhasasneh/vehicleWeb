import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehicleMakeComponent } from './features/vehicle-make/vehicle-make.component';
import { VehicleModelComponent } from './features/vehicle-model/vehicle-model.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    VehicleMakeComponent,
    VehicleModelComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vehicleWeb';

  selectedMakeId: number | null = null;
  selectedYear: number | null = null;

  onMakeSelected(selection: { makeId: number, year: number }): void {
    this.selectedMakeId = selection.makeId;
    this.selectedYear = selection.year;
  }
}
