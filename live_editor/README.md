# Project tauntaun - Live editor

Live editor is browser based collaborative mission planning tool. Having python, node.js, and yarn installed is required in order to run this project locally.

## Usage

```bash
cd ..\project_tauntaun
```
**Create python virtual environment (one time)**
```bash
py -m venv env
```
**Activate virtual env**
```bash
env\Scripts\activate
```
**Install/update requirements**
```bash
pip install -r requirements.txt
```
**Generate dcs_static.json**
```
cd live_editor/backend/data
python gen_client_data.py
copy dcs_static.json to live_editor/frontend/src/data/dcs_static.json
```
**Run server**
```bash
cd live_editor/backend
py camp.py
```
**Install web client dependencies (after updates to the frontend)**  
In a new terminal go to the frontend dir.
```bash
cd live_editor/frontend
yarn install
```

**Open web client**  
In a new terminal go to the frontend dir.
```bash
cd live_editor/frontend
yarn start
```
