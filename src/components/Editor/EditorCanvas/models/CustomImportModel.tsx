import { useLoader, useResource } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { message } from 'antd';
import { CustomModel as CustomModelType } from '../../../../types/editor';
import EditorTransformControls from '../EditorTransformControls';
import Loader from '../Loader';
import { useModelProps } from 'utils/editor';
import { revertAddingBrokenModel } from 'actions/editor/model';

interface CustomModelProps {
  model: CustomModelType;
}

function CustomModel({ model }: CustomModelProps) {
  // determine the model type via the 
  // todo: #2 Add loader support for STL and OBJ files
  // todo: see https://github.com/pmndrs/react-three-fiber/discussions/1308
  let typeLoad = '';
  switch (model.modelUrl.slice(-3).toLowerCase()) {
    case 'gltf':
      console.log('gltf');
      break;
    case 'stl':
      console.log('stl');
      break;
    case 'obj':
      console.log('obj');
      break;
    case '3mf':
      console.log('3mf');
      break;
    case 'fbx':
      console.log('fbx');
      break;
    case 'gcode': // todo: #3 add gcode import support via loader
      console.log('gcode');
      break;
    default:
      console.log('unknown model type - default');
  }
  
  let primitive = useResource<any>();

  let { meshProps } = useModelProps(model, {
    meshRef: primitive,
  });

  let gltf = useLoader(GLTFLoader, model.modelUrl);

  // I don't know Why
  let object = gltf.scene.clone(true);

  return (
    <EditorTransformControls model={model}>
      <group {...meshProps} ref={primitive}>
        <primitive object={object} />
      </group>
    </EditorTransformControls>
  );
}

export default function CustomModelWrapper(props: CustomModelProps) {
  let { model } = props;
  return (
    <ErrorBoundary
      FallbackComponent={EmptyComp}
      onError={() => {
        message.error(
          'This model has some Errors so we will remove it from the scene',
        );
        revertAddingBrokenModel(model.id);
      }}
    >
      <Suspense fallback={<Loader />}>
        <CustomModel {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
const EmptyComp = () => null;
