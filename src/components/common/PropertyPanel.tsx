/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';
import { Rnd } from 'react-rnd';
import PropertyForm from '../Editor/Property/PropertyForm';
import { propertiesDefinitions } from '../Editor/Property/definitions';
import {
  updateModelProperties,
  useSelectedModel,
} from '../../actions/editor/model';

const WIDTH = 250;

function PropertyPanel() {
  let initialX = useMemo(() => window.innerWidth - WIDTH - 12, []);

  let selectedModal = useSelectedModel();

  if (!selectedModal) {
    return null;
  }

  return (
    <Rnd
      css={{
        border: '1px solid  var(--border-color-split)',
        zIndex: 9999,
        background: 'var(--border-color-split)',
        boxShadow: 'var(--box-shadow-base)',
        overflow: 'hidden',
      }}
      cancel={'.PropertyPanel__undraggable-area'}
      // @ts-ignore
      default={{
        x: initialX,
        y: 50,
        width: WIDTH,
      }}
    >
      <div
        css={{ height: '100%', display: 'grid', gridTemplateRows: '32px 1fr' }}
      >
        <div css={{ padding: '0 12px', lineHeight: '32px' }}>
          Properties ({selectedModal.name})
        </div>
        <div
          className="PropertyPanel__undraggable-area" // used with cancel prop
          css={{
            padding: 12,
            background: 'var(--component-background)',
            cursor: 'default',
          }}
        >
          <PropertyForm
            inputDefinitions={propertiesDefinitions[selectedModal.type]}
            properties={selectedModal}
            onChange={newProperties => {
              if (selectedModal) {
                updateModelProperties(selectedModal.id, newProperties);
              }
            }}
          />
        </div>
      </div>
    </Rnd>
  );
}

export default PropertyPanel;
