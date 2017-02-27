import './rxjs-extensions';
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, PreloadAllModules } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { EventsAppComponent } from './events-app.component'

import {
    EventsListComponent,
    EventsThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventResolver,
    EventListResolver,
    CreateSessionComponent,
    SessionListComponent,
    UpvoteComponent,
    VoterService,
    LocationValidator,
    DurationPipe
} from './events/index'

import { NavBarComponent } from './nav/navbar.component'
import { JQ_TOKEN,  TOASTR_TOKEN, Toastr, CollapsibleWellComponent, SimpleModalComponent, ModalTriggerDirective} from './common/index'
import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'
import { AuthService } from './user/auth.service'

declare let toastr: Toastr
declare let jQuery: Object

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule,HttpModule,
        RouterModule.forRoot(appRoutes, { preloadingStrategy : PreloadAllModules })
    ],
    declarations:
    [
        EventsAppComponent,
        EventsListComponent,
        EventsThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        SimpleModalComponent,
        ModalTriggerDirective,
        UpvoteComponent,
        LocationValidator,
        DurationPipe
    ],
    providers: [VoterService, EventService, {
         provide: TOASTR_TOKEN, useValue: toastr }, 
         { provide: JQ_TOKEN, useValue: jQuery }, 
         { provide: EventResolver, useClass : EventResolver }, 
         EventListResolver,
        AuthService,
        { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState }],
    bootstrap: [EventsAppComponent]
})
export class AppModule { }
function checkDirtyState(component: CreateEventComponent) {
    if (component.isDirty)
        return window.confirm('You have not saved this event, do you really want to cancel?')
    return true
}