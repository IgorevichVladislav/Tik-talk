import {Directive, output} from '@angular/core';

@Directive({
  selector: '[dnd]',
  host: {
    '(dragover)': 'onDragover($event)',
    '(drop)': 'onDrop($event)',
    '(dragleave)': 'onDragleave($event)',
    '[class.fileover]': 'fileover'
  }
})
export class DndDirective {
  fileDropped = output<File>();
  fileover = false;

  onDragover(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.fileover = true;
  }

  onDrop(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();

    const file = event.dataTransfer?.files[0];
    if (!file) return;
    this.fileDropped.emit(file);

    this.fileover = false;
  }

  onDragleave(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.fileover = false;
  }
}
