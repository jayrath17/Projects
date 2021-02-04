import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("data.csv")

sns.barplot(df['time(seconds)'], df.task)

plt.show()
