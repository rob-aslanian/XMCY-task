import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./photos/photos.component').then((c) => c.PhotosComponent),
      },

      {
        path: 'photos/:id',
        loadComponent: () =>
          import('./detail-view/detail-view.component').then(
            (c) => c.DetailViewComponent
          ),
      },
    ],
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/favorites.component').then(
        (c) => c.FavoritesComponent
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
