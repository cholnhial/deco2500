import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {MyListingsListRoutingModule} from "../my-listings-list/my-listings-list-routing.module";
import {MyListingsListPage} from "../my-listings-list/my-listings-list";
import {FavouritesPage} from "./favourites";
import {FavouritesRoutingModule} from "./favourites-routing.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FavouritesRoutingModule
  ],
  declarations: [FavouritesPage],
})
export class FavouritesModule {}
