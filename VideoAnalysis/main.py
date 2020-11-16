import subprocess
import os
import scipy.io.wavfile as wav
import IPython
import matplotlib.pyplot as plt
import numpy as np
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip
%matplotlib inline

ffmpeg_path = 'D:/Work/Video/ffmpeg/bin/ffmpeg.exe'
wav_path = 'D:/Work/Video/Wav'
raw_videos_path = 'D:/Work/Video/RAW'
highlight_path = 'D:/Work/Video/Highlights'

file_list = [f for f in os.listdir(raw_videos_path)]

command = [[ffmpeg_path,'-i', file, wav_path+'/'+os.path.splitext(file)[0]+'.wav'] for file in file_list]

for cmd in command:
    #Remove old wav files
    try:
        os.remove(wav_path+'/'+os.path.splitext(cmd[2])[0]+'.wav')
    except OSError:
        pass
    process = subprocess.run(cmd, cwd=raw_videos_path)

wav_file_list = [w for w in os.listdir(wav_path) if w.endswith('.wav')]

