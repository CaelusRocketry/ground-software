# (x1, y1) 20 analog -> actual (0 psi)
# (x2, y2) 300 analog -> actual (100 psi)

pt_list = "12345678"

# {pt name : [x1, y1, x2, y2]} 
x_and_y_values = {i : [0, 0, 0, 0] for i in pt_list}

# {pt name : [m, b]} 
m_and_b_values = {i : [0, 0] for i in pt_list}

for i in pt_list:
    voltage1 = int(input("PT-" + i + " analog read value (on GS) at 0 psi: "))
    x_and_y_values[i][0] = voltage1
    x_and_y_values[i][1] = 0

for i in pt_list:
    psi2 = int(input("PT-" + i + " Second PSI: "))
    voltage2 = int(input("PT-" + i + " second analog read value (on GS): "))
    x_and_y_values[i][2] = voltage2
    x_and_y_values[i][3] = psi2
    
for i in x_and_y_values:
    x1 = x_and_y_values[i][0]
    y1 = x_and_y_values[i][1]
    x2 = x_and_y_values[i][2]
    y2 = x_and_y_values[i][3]

    m = (y2 - y1) / (x2 - x1)

    # y - y1 = m(x - x1)
    # y = mx - mx1 + y1
    # y1 = 0 (always checking at 0 psi for the first point), so b = -mx1

    b = -m * x1

    m_and_b_values[i][0] = m
    m_and_b_values[i][1] = b

for i in m_and_b_values:
    print("PT-" + i + " m: " + str(m_and_b_values[i][0]))
    print("PT-" + i + " b: " + str(m_and_b_values[i][1]))
