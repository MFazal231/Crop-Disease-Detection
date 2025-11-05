# TensorFlow Installation Fix for Windows

## Problem
You're encountering a DLL load error when importing TensorFlow. This is commonly caused by:
1. **Python 3.13 incompatibility** - TensorFlow doesn't fully support Python 3.13 yet
2. **Missing Visual C++ Redistributable** - Required for TensorFlow on Windows

## Solutions (try in order)

### Solution 1: Install Visual C++ Redistributable (Quick Fix)
1. Download and install: https://aka.ms/vs/17/release/vc_redist.x64.exe
2. Restart your computer
3. Try importing TensorFlow again

### Solution 2: Use Python 3.11 or 3.12 (Recommended)
TensorFlow officially supports Python 3.9-3.12. Python 3.13 support is still experimental.

**Option A: Install Python 3.12 alongside 3.13**
1. Download Python 3.12 from https://www.python.org/downloads/
2. During installation, check "Add Python to PATH"
3. Create a virtual environment with Python 3.12:
   ```powershell
   py -3.12 -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```

**Option B: Use Python 3.12 in Jupyter**
```powershell
py -3.12 -m pip install ipykernel
py -3.12 -m ipykernel install --user --name python312 --display-name "Python 3.12"
```
Then select "Python 3.12" as your kernel in Jupyter.

### Solution 3: Try tensorflow-cpu
If you must use Python 3.13, try:
```powershell
pip uninstall tensorflow
pip install tensorflow-cpu
```

### Solution 4: Use Conda (Alternative)
Conda environments often handle dependencies better:
```powershell
conda create -n tf_env python=3.11
conda activate tf_env
conda install tensorflow
```

## Verify Installation
After trying a solution, run:
```python
import tensorflow as tf
print(f"TensorFlow {tf.__version__} installed successfully!")
```










