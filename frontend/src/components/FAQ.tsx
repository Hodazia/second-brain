import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What's secondBrain for?",
    answer: "secondBrain is a digital knowledge management tool that helps you organize, save, and access all your important links, documents, videos, and ideas in one clean, searchable space."
  },
  {
    question: "What differentiates secondBrain from other note-taking tools?",
    answer: "Unlike traditional note-taking apps, secondBrain focuses on content curation and organization. It automatically categorizes your content by type (YouTube, websites, documents, tweets) and provides powerful search and tagging capabilities."
  },
  {
    question: "Can I use secondBrain even if I don't have much content to organize?",
    answer: "Absolutely! secondBrain is designed to grow with you. Start with just a few items and gradually build your digital knowledge base. The more you use it, the more valuable it becomes."
  },
  {
    question: "Is secondBrain only for specific content types?",
    answer: "No, secondBrain supports all types of digital content including YouTube videos, websites, documents, tweets, and more. You can save anything that has a URL or can be described."
  },
  {
    question: "Is secondBrain free to use?",
    answer: "Yes! secondBrain is completely free to use with all core features. We believe knowledge organization should be accessible to everyone."
  },
  {
    question: "Does secondBrain work only with English content?",
    answer: "No, secondBrain works with content in any language. The interface is in English, but you can save and organize content in any language."
  },
  {
    question: "How is my data used and protected?",
    answer: "Your data is private and secure. We use industry-standard encryption and never share your personal information. Your content belongs to you and is only accessible to you."
  },
  {
    question: "Can I export my data from secondBrain?",
    answer: "Yes, you can export your data at any time. We believe in data portability and want you to have full control over your information."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="text-orange-500 font-semibold">FAQ</span>
            <Star className="w-4 h-4 text-orange-500" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-t border-gray-200 first:border-t-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left py-6 px-4 transition-all duration-200 ${
                  openIndex === index 
                    ? 'bg-orange-50 border-l-4 border-orange-500' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <button className="text-orange-500 hover:text-orange-600 font-semibold underline">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}; 