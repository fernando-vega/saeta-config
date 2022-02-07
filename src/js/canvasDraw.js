let canvas = new fabric.Canvas('canvas-draw');
let image = document.getElementById('mainImage');
let configuration = document.getElementById('checkboxList');
let textAvaible = document.querySelector('#textAvaible');
let motivoAvaible = document.querySelector('#motivoAvaible');
let imageAvaible = document.querySelector('#imageAvaible');
let sizeAvaible = document.querySelector('#sizeAvaible');
let centerAvaible = document.querySelector('#centerAvaible');
let checkboxList = document.querySelectorAll("input[type=checkbox]");
let configAreas = [];

setTimeout(() => {
  canvas.setDimensions({
    width: image.clientWidth,
    height: image.clientHeight
  });
}, 1000);

window.insertShape = async function () {
  let rect = new fabric.Rect({
    left: (image.clientWidth / 2) - 25,
    top: (image.clientHeight / 2) - 25,
    fill: 'rgba(100,200,200,0.5)',
    strokeWidth: 1,
    stroke: 'rgba(100,200,200,0.5)',
    width: 50,
    height: 50,
  });
  canvas.add(rect);
}

function getSelection() {
  return canvas.getActiveObject() == null ? canvas.getActiveGroup() : canvas.getActiveObject();
}

window.deleteObjects = async function () {
  getSelection();
  let activeObject = canvas.getActiveObject()
  if (activeObject) {
    if (confirm('¿Está seguro de que desea eliminar el elemento seleccionado?')) {

      // Remove from item_list
      let obJindex = configAreas.indexOf(activeObject);
      if (obJindex > -1) {
        configAreas.splice(obJindex, 1);
      }
      canvas.remove(activeObject);
    }
  }
}

function onObjectSelected(e) {
  if (canvas.getActiveObject() != null) {
    configuration.classList.add('active');
    if ((e.target.get('type')) === "i-text") {
      document.getElementById("textMenu").className = "displayOperations";
    } else {
      let activeObjectConfigList = [];
      activeObjectConfigList.push(canvas.getActiveObject().allowText, canvas.getActiveObject().allowDraw, canvas.getActiveObject().allowImage, canvas.getActiveObject().allowResize, canvas.getActiveObject().allowAutoCentered)
      getCheckboxConfig(activeObjectConfigList);
    }
  }
}

function getCheckboxesValues() {
  return [].slice.apply(checkboxList)
    .filter(function (c) {
      return c.checked;
    })
    .map(function (c) {
      return c.value;
    });
}

function getCheckboxConfig(object) {
  let dataObject = Object.values(object);
  for (let i = 0; i < dataObject.length; i++) {
    checkboxList[i].checked = dataObject[i];
  }
}

function setCheckboxConfig(activeObject, checkboxList) {
  checkboxList = checkboxList.map((item) => {
    return item.replace('on', true)
  });
  activeObject.allowText = textAvaible.checked;
  activeObject.allowDraw = motivoAvaible.checked;
  activeObject.allowImage = imageAvaible.checked;
  activeObject.allowResize = sizeAvaible.checked;
  activeObject.allowAutoCentered = centerAvaible.checked;
}

function visibleConfiguration() {
  canvas.on('object:selected', onObjectSelected);
  canvas.on('before:selection:cleared', function () {
    configuration.classList.remove('active');
    let activeObject = canvas.getActiveObject();
    if (activeObject != null) {
      setCheckboxConfig(activeObject, getCheckboxesValues())
      let obJindex = configAreas.indexOf(activeObject);
      if (obJindex > -1) {
        configAreas.splice(obJindex, 1);
      }
      configAreas.push(activeObject);
    }
  });
}

export function setConfigAreas() {
  let areas = configAreas.map((area) => {
    delete area.active,
    delete area.canvas,
    delete area.isMoving,
    delete area.oCoords,
    delete area.originalState,
    delete area._controlsVisibility,
    delete area.__corner,
    delete area.clipTo,
    delete area.fill,
    delete area.stroke,
    delete area.strokeWidth,
    area.originX,
    area.originY,
    area.left,
    area.top,
    area.width,
    area.height,
    area.scaleX,
    area.scaleY,
    area.angle,
    area.allowText,
    area.allowDraw,
    area.allowImage,
    area.allowResize,
    area.allowAutoCentered
    return area;
  })
  return areas;
}

visibleConfiguration();