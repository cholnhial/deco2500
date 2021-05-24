import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { SearchPage } from '../search/search';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'search',
        children: [
          {
            path: '',
            component: SearchPage,
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          }
        ]
      },
      {
        path: 'speakers',
        children: [
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          },
          {
            path: 'speaker-details/:speakerId',
            loadChildren: () => import('../speaker-detail/speaker-detail.module').then(m => m.SpeakerDetailModule)
          },
          {
            path: '',
            loadChildren: () => import('../speaker-list/speaker-list.module').then(m => m.SpeakerListModule)
          }
        ]
      },
      {
        path: 'my-listings',
        children: [
          {
            path: 'listing/:listingId',
            loadChildren: () => import('../listing-details/list-details.module').then(m => m.ListDetailsModule)
          },
          {
            path: 'edit-new/:userListingId',
            loadChildren: () => import('../my-listings-edit/my-listings-edit.module').then(m => m.MyListingsEditModule)
          },
          {
            path: '',
            loadChildren: () => import('../my-listings-list/my-listings-list.module').then(m => m.MyListingsListModule)
          }
        ]
      },
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren: () => import('../discover/discover.module').then(m => m.DiscoverModule)
          },
          {
            path: 'comments',
            loadChildren: () => import('../comments/comments.module').then(m => m.CommentsModule)
          },
          {
            path: 'profile',
            loadChildren: () => import('../post-profile/post-profile.module').then(m => m.PostProfileModule)
          }
        ]
      },
      {
        path: 'favourites',
        children: [
          {
            path: '',
            loadChildren: () => import('../favourites/favourites.module').then(m => m.FavouritesModule)
          }
        ]
      },
      {
        path: 'messages',
        children: [
          {
            path: '',
            loadChildren: () => import('../messages-list/messages-list.module').then(m => m.MessagesListModule)
          },
          {
            path: 'chat/:chatId',
            loadChildren: () => import('../chat/chat.module').then(m => m.ChatModule)
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => import('../map/map.module').then(m => m.MapModule)
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../account/account.module').then(m => m.AccountModule)
          },
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: () => import('../notifications/notifications.module').then(m => m.NotificationsModule)
          },
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/search',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

