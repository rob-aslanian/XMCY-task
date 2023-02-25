import { TestBed } from '@angular/core/testing';

import { ImageLocalStorageService } from './image-local-storage.service';

describe('ImageLocalStorageService', () => {
  let service: ImageLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty images list from local storage', () => {
    const localStorageGetItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    service.getImages();

    expect(localStorageGetItemSpy).toHaveNthReturnedWith(2, JSON.stringify([]));
  });

  it('should add image to local storage', () => {
    const localStorageSetItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    service.addImage(0);

    expect(localStorageSetItemSpy).toHaveBeenLastCalledWith(
      'favorites',
      JSON.stringify([0])
    );
  });

  it('should not add image with same id to local storage', () => {
    const localStorageSetItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    service.addImage(0);
    service.addImage(0);

    expect(localStorageSetItemSpy).not.toHaveBeenCalledTimes(3);
  });

  it('should delete image by id from local storage', () => {
    const localStorageGetItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    service.addImage(0);
    service.addImage(1);

    service.deleteImage(0);
    expect(localStorageGetItemSpy).toHaveReturnedWith(JSON.stringify([0]));
  });

  it('should return correct amount of favorite items', (done) => {
    service.addImage(0);
    service.addImage(1);

    service.favoriteAmount$().subscribe((amount) => {
      expect(amount).toBe(2);
      done();
    });
  });
});
