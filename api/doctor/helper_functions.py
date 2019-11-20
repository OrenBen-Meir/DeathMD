from joblib import load

def incr_digit_list(digit_list, base=2):
    """
    Takes in a list called digit_list and treats it like a 
    number with digits and increments digit_list by 1.
    If there is no overflow, the function returns true, else false.
    Each entry in digit_list can be thought of as an individual digit.
    For example, the 0th digit is digit_list[0]. The variable base is the
    number system base for our digit list, so if for example 
    base=16, then digit_list is treated as a hexadecimal value.
    This is an inplace funtion and it 
    """
    for i in range(len(digit_list)):
        digit_list[i] += 1
        if digit_list[i] < base:
            return True
        digit_list[i] = 0
    return False

def doctor_filename():
    """
    Returns name of the joblib file
    the Doctor object is being serialized
    """
    return "doctor.joblib"