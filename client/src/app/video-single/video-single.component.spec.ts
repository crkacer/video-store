import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSingleComponent } from './video-single.component';

describe('VideoSingleComponent', () => {
  let component: VideoSingleComponent;
  let fixture: ComponentFixture<VideoSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
