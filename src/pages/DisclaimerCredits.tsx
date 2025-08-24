import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

export default function DisclaimerCredits() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Disclaimer & Credits</h1>
          <p className="text-lg text-muted-foreground">
            Important information about this project and acknowledgments to the original creators
          </p>
        </div>

        <div className="space-y-8">
          {/* Disclaimer Section */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📜</span>
                <h2 className="text-2xl font-bold">Disclaimer</h2>
              </div>
              
              <div className="prose prose-lg max-w-none space-y-4 leading-relaxed">
                <p>
                  This website is nothing more than a <strong>small student project</strong>, created as part of my own journey in computer science. I want to make it absolutely clear that I am <strong>only a student</strong> — not a teacher, not an institution, and not a professional organization. My project is simply a way of taking all the scattered study materials that are already available online and putting them in one place, in a simple, structured manner. The main aim is to help fellow learners save time: instead of spending hours searching multiple websites for different topics, they can find everything organised here as a quick reference. It is not intended to compete with or replace any of the original platforms, but to serve as a <strong>student-built convenience tool</strong> that points learners towards the incredible work others have already done.
                </p>

                <p>
                  All of the PDFs, notes, and study materials you see here <strong>belong entirely to the original authors, educators, and platforms</strong> who took the time and effort to produce and share them. I have not written, authored, or edited a single one of these resources. My role is only that of an organiser: I have brought them together into one site so that students can access them quickly, while always recognising that the real credit lies with the creators. This is their content, their knowledge, and their generosity — and without them, this project would have no meaning at all. My task has only been to make it a little easier for students to navigate, never to claim ownership.
                </p>

                <p>
                  This project is also <strong>completely non-commercial and will never involve any kind of monetization</strong>. There is no selling, no profit, and no claim of originality. It is just a simple school-level CS project made by me as a student, for the benefit of other students. It is important to emphasise that this is not meant as a publishing platform or an alternative to the original websites — it is a humble effort to support the learning process by reducing friction. Everything here is meant to help learners, and nothing here is intended to diminish the role of the rightful authors and contributors.
                </p>

                <p>
                  <strong>In fact, my hope is that this project becomes an additional way to benefit and highlight the incredible platforms and educators who created these resources. By bringing together their work into one simple hub, I believe more students will discover them, visit their original websites, and make use of the full range of study material and support they provide. Rather than drawing traffic away, this project aims to shine a brighter light on their efforts, serving almost as a guidepost that directs learners back to them. Every click here is meant to encourage students to explore further, to go beyond this project, and to support and appreciate the original contributors. My gratitude is towards them entirely — they are the real foundation, and this site is only a map pointing learners in their direction.</strong>
                </p>

                <p>
                  If any contributor or platform feels their resources should not be shown here, or would prefer they be presented differently, I will <strong>immediately and happily adjust</strong> the site — whether that means replacing PDFs with direct links, adding more prominent credits, or making any other respectful changes. I want this project to stay firmly in the spirit of learning and gratitude.
                </p>

                <p>
                  This is not a platform of ownership — it is a <strong>simple organising tool built by a student for students</strong>, with full respect for the original creators.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Credits Section */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🙏</span>
                <h2 className="text-2xl font-bold">Credits</h2>
              </div>
              
              <div className="prose prose-lg max-w-none space-y-4 leading-relaxed">
                <p>
                  This project could not exist without the <strong>incredible dedication of the original educators, contributors, and online communities</strong> who created and shared these study resources. They are the true authors and deserve all the credit, recognition, and appreciation.
                </p>

                <p>Special thanks and gratitude go to:</p>

                <ul className="space-y-2">
                  <li>
                    <a 
                      href="https://www.physicsandmathstutor.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      Physics & Maths Tutor
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://backnotes.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      BackNotes
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://studywithmehar.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      StudyWithMehar
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://igcsemaths.in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      IGCSE Maths
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://rigcse.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      RIGCSE
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.reddit.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      Reddit Community
                    </a>
                  </li>
                  <li>
                    <strong>Suresh Goyal</strong> – for his excellent Mathematics and Further Mathematics notes, which have helped countless students.
                  </li>
                  <li>
                    <strong>Study with Majid</strong> – for his detailed and structured Computer Science notes and guidance.
                  </li>
                  <li>
                    <a 
                      href="https://rocketrevised.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      Rocket Revise
                    </a> – for their helpful learning resources and support.
                  </li>
                </ul>

                <p>
                  Every single PDF and note belongs to them, not me. I am deeply thankful for their efforts in making these resources freely available to students all over the world. This project is simply my way of <strong>collating their amazing work into one space</strong> so that learners can find it quickly and then go back to their original websites for more.
                </p>

                <p>
                  This website is, at its heart, nothing more than a <strong>student's small initiative</strong> — a project built out of respect and gratitude, not out of ownership or profit. Everything here is <strong>yours, not mine</strong>, and I am simply assisting by making it easier to find.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}