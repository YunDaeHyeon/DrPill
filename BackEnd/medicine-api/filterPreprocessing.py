import pandas as pd
# Load the cleaned data file
data = pd.read_csv('./resource/cleaned_pill_info.csv')

# Check the specific row causing the issue
problem_row = data.iloc[1770]  # Row 1770 (Python index is 0-based)
print("Problem Row Data:")
print(problem_row)

# Check if any column has missing values
print("Missing values in this row:")
print(problem_row.isnull())

# Drop rows with any missing data
cleaned_data = data.dropna()

# Save the corrected file
final_output_path = './resource/cleaned_pill_info_no_issues.csv'
cleaned_data.to_csv(final_output_path, index=False)
print(f"Cleaned file saved to: {final_output_path}")