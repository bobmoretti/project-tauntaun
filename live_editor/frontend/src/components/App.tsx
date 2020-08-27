import React, { useEffect, createContext } from 'react';

import './App.css';

import { CampaignMap, EditWaypointForm } from './';
import { MenuBar } from './';
import { AppStateContainer, AddFlightMode, EditGroupMode, Group } from '../models';
import { AddFlightForm } from './AddFlightForm';
import { LeafletMouseEvent } from 'leaflet';
import { findGroupById } from '../models/dcs_util';
import { LoadoutEditor } from './LoadoutEditor';

type ModeContextType = {
  groupMarkerOnClick?: (group: Group, event: any) => void;
  selectedGroupId?: number;
}

export const ModeContext = createContext({} as ModeContextType);

export function App() {
  const appState = AppStateContainer.useContainer();

  useEffect(() => {
    appState.initialize();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { masterMode } = appState;

  const masterModeName = masterMode?.name;
  const addFlightMode = masterMode as AddFlightMode;
  const editGroupMode = masterMode as EditGroupMode;
  const location = addFlightMode.location;
  const selectedWaypoint = editGroupMode.selectedWaypoint;
  const selectedGroupId = editGroupMode.selectedGroupId;
  const selectedUnitId = editGroupMode.selectedUnitId;
  const group = selectedGroupId ? findGroupById(appState.mission, selectedGroupId) : undefined;
  const unit = group && selectedUnitId ? group.units.find(u => u.id === selectedUnitId) : undefined;

  const mapOnClick = (e: LeafletMouseEvent) => {
    if (masterModeName === 'AddFlightMode') {
      appState.setLocation(e.latlng);
    }
  };

  const groupMarkerOnClick = (group: Group, event: any): void => {
    if (masterModeName !== 'EditGroupMode') return;

    if (event && event.coalition !== 'blue') return;

    console.info(`selecting group`, group);

    if (selectedGroupId === undefined) {
      appState.selectGroup(group);
    }
    if (selectedGroupId === group.id) {
      appState.selectGroup(undefined);
    } else {
      appState.selectGroup(group);
    }
  };

  const renderEditWaypointForm = () => {
    if (masterModeName === 'EditGroupMode' && selectedGroupId && selectedWaypoint) {
      if (group) {
        return <EditWaypointForm group={group} pointIndex={selectedWaypoint} />;
      }
    }

    return;
  };

  return (
    <div>
      <MenuBar />
      {masterModeName === 'AddFlightMode' && location && <AddFlightForm location={location} />}
      {renderEditWaypointForm()}
      {unit && <LoadoutEditor unit={unit} />}
      <ModeContext.Provider value={ {groupMarkerOnClick: groupMarkerOnClick, selectedGroupId: masterModeName === 'EditGroupMode' ? editGroupMode.selectedGroupId : undefined} }>
        <CampaignMap
          lat={43}
          lng={41}
          zoom={9}
          tileLayerUrl="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYm9ibW9yZXR0aSIsImEiOiJjazI4amV6eWswaWF2M2JtYjh3dmowdnQ1In0.XutSpPpaRm9LZudTNgVZwQ"
          mission={appState.mission}
          onMapClick={mapOnClick}
        />
      </ModeContext.Provider>
    </div>
  );
}