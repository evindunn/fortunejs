#!/usr/bin/env python3

import os
import pandas as pd
import sqlite3

# all_rows = list()
# for root, dirs, files in os.walk("fortune-mod/main/datfiles"):
#     for file in files:
#         if file == "Makefile":
#             continue
#         full_path = os.path.abspath(os.path.join(root, file))
#         with open(full_path, encoding="windows-1252") as f:
#             quotes = f.read().split('%')
#         for quote in quotes:
#             if quote is None or quote == '':
#                 continue
#             row = {
#                 "topic": file,
#                 "fortune": quote,
#                 "dirty": "unrotated" in full_path
#             }
#             all_rows.append(row)
#
# df = pd.DataFrame(all_rows)
# print(df.head())
# df.to_csv("test.csv", index=False)

# df = pd.read_csv("test.csv")
# with sqlite3.connect("fortunes.db") as c:
#     df.to_sql("fortunes", c, if_exists="replace", index=False, dtype={"topic": "TEXT", "fortune": "TEXT", "dirty": "INTEGER"})
# c.close()

with sqlite3.connect("fortunes.db") as conn:
    conn.row_factory = sqlite3.Row
    cu = conn.execute("SELECT * FROM fortunes")
    for r in cu.fetchall():
        for c in r:
            print(c, end=" ")
        print()
conn.close()
