function Policies() {
  const Section = ({ title, items }) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
          >
            <p className="text-gray-700 font-medium">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Insurance Policies
      </h1>

      <Section
        title="Term Insurance"
        items={[
          "Life Insurance",
          "List of Term Insurance Plan",
          "Term Insurance for NRI",
          "What is Term Insurance",
          "1 Crore Term Insurance",
          "Term Insurance Calculator",
          "Dedicated Claim Assistance",
          "Term Insurance for Women",
          "Term Insurance for HNI",
          "Term Insurance Return of Premium",
        ]}
      />

      <Section
        title="Other Insurance"
        items={[
          "Travel Insurance",
          "International Travel Insurance",
          "Schengen Travel Insurance",
          "Group Health Insurance",
          "Marine Insurance",
          "Workmen Compensation Policy",
          "Professional Indemnity",
          "Doctors Indemnity Insurance",
          "Fire Insurance",
          "Shopkeepers Insurance",
          "Office Insurance",
          "Comprehensive General Liability",
          "Cyber Insurance",
          "Contractors All Risk",
          "Surety Bond",
          "Home Insurance",
          "Home Loan Insurance",
          "Home Loan EMI Calculator",
          "Pet Insurance",
          "Cancer Insurance",
          "Defence Personnel Insurance",
          "General Insurance",
        ]}
      />

      <Section
        title="Investment Plans"
        items={[
          "Investment Plans with High Returns",
          "Unit Linked Insurance Plans (ULIP)",
          "Investment Plans for NRIs",
          "Best SIP Plans",
          "Capital Guarantee Plans",
          "Child Plans",
          "Pension Plans",
          "Dollar Based Investment Plans",
          "Guaranteed Return Plans",
          "Tax Saving Investments",
          "SIP Calculator",
          "Endowment Policy",
          "LIC",
          "Money Back Policy",
          "Annuity Plans",
          "Income Tax Calculator",
        ]}
      />

      <Section
        title="Health Insurance"
        items={[
          "Book Free Home Visit",
          "Family Health Insurance",
          "Senior Citizen Health Insurance",
          "Health Insurance for Parents",
          "Maternity Insurance",
          "Network Hospitals",
          "Health Insurance Portability",
          "OPD Cover In Health Insurance",
          "Mediclaim Policy",
          "Critical Illness Insurance",
          "Health Insurance Calculator",
          "Health Insurance Companies",
          "Types of Health Insurance",
          "Health Insurance for NRIs",
        ]}
      />

      <Section
        title="Motor Insurance"
        items={[
          "Car Insurance",
          "Motor Insurance",
          "Bike Insurance",
          "Zero Dep Car Insurance",
          "Third Party Insurance",
          "Third Party Bike Insurance",
          "Car Insurance Calculator",
          "Bike Insurance Calculator",
          "Car Insurance Companies",
          "Pay As You Drive Insurance",
          "Commercial Vehicle Insurance",
          "Electric Car Insurance",
          "E-Bike Insurance",
          "IDV Calculator",
          "Comprehensive Insurance",
          "New Car Insurance",
          "Car Insurance Status",
        ]}
      />
    </div>
  );
}

export default Policies;
