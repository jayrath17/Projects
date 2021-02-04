import pyautogui
import time
import pandas as pd

df = pd.read_csv("data.csv")


s = 0

while True:
    i = df[df.task == pyautogui.getActiveWindowTitle()].index.values


    if len(i) == 0:
        d = {'task': pyautogui.getActiveWindowTitle(), 'time(seconds)' : 1}
        df = df.append(d, ignore_index=True)
        time.sleep(1)
    else:
        df.iat[i[0],1] +=1
        time.sleep(1)

    df.to_csv("data.csv", index=False)



