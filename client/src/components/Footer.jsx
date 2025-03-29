import { productLinks, companyLinks, resourcesLinks, legalLinks } from "../constants";
const Footer = () => {
  return (
    <footer className="mt-20 py-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-md font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            {productLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-gray-600 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div  className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-md font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            {companyLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-gray-600 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-md font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-gray-600 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-md font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            {legalLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-gray-600 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
