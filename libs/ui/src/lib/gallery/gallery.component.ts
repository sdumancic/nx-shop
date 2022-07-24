import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'nx-shop-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() images: string[] | undefined
  selectedImage: string = ''
  constructor() {}

  ngOnInit(): void {
    if (this.images && this.images.length) {
      this.selectedImage = this.images[0]
    }
  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImage = imageUrl
  }

  get hasImages(): boolean {
    if (this.images === undefined) {
      return false
    }
    return this.images?.length > 0
  }
}
