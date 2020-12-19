import { Plane as DreiPlane } from 'drei';
import { PlaneModel } from '../../../../types/editor';

interface PlaneProps {
  model: PlaneModel;
}

function Plane({ model }: PlaneProps) {
  return (
    <DreiPlane args={[3, 3]}>
      <meshStandardMaterial attach="material" color="#393e46" />
    </DreiPlane>
  );
}

export default Plane;
