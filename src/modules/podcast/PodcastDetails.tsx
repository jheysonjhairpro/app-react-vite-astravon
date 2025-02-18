import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa";

export default function PodcastDetail(): JSX.Element {
  const location = useLocation();
  const { category } = (location.state as { category?: string }) || {};
  const [expandedParent, setExpandedParent] = useState<boolean>(true);
  const [expandedChild, setExpandedChild] = useState<number | null>(null);

  const handleChildAccordionChange =
    (panel: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      console.log(event)
      setExpandedChild(isExpanded ? panel : null);
    };

  return (
    <div className="page-content p-4 text-white rounded-lg flex gap-4">
      <h6 className="mb-0 text-uppercase text-white">
        Programas que podria gustarte
      </h6>
      <hr />
      <div className="row">
        <div className="col-12 col-md-1 d-flex flex-column align-items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRijyNn6XXDdUz-R7qRjHSUppgclfuYSmlHZg&s"
            alt="Podcast"
            className="rounded-circle"
            style={{ width: "90px", height: "90px", objectFit: "cover" }}
          />
        </div>

        <div className="col-12 col-md-11">
          <Accordion
            expanded={expandedParent}
            onChange={() => setExpandedParent(!expandedParent)}
          >
            <AccordionSummary
              expandIcon={<MdExpandMore className="text-white h3" />}
              className="bg-secondary text-white p-2 rounded-lg"
            >
              <div>
                <Typography className="font-bold text-lg text-uppercase">
                  {category}
                </Typography>
                <Typography className="text-sm text-gray-300">
                  Encontrarás temas muy importantes de estructuras paso a paso
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className="bg-dark p-3 rounded-lg">
              {[
                "Estructuras en dificaciones capitulo 1",
                "Estructuras en dificaciones capítulo 2",
              ].map((capitulo, index) => (
                <Accordion
                  key={index}
                  expanded={expandedChild === index}
                  onChange={handleChildAccordionChange(index)}
                  className="mb-2 bg-secondary text-white rounded-lg"
                >
                  <AccordionSummary
                    expandIcon={<MdExpandMore className="text-white h4" />}
                    className="px-3"
                  >
                    <Typography className="font-semibold">
                      {capitulo}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="bg-dark p-3 ">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="d-flex align-items-center py-2"
                      >

                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSAUNHlqjgzy6m2LFZrOgluVdNBrziNB1xuJoDzz_JN9EJMUYsgFvC9uYJBfeOAccvuE&usqp=CAU"
                          alt="Podcast Icon"
                          className="img-fluid rounded me-3"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <Typography className="text-wt flex-grow-1">
                          {capitulo} - Track {item}
                        </Typography>

                        <div className="ms-auto">
                          <IconButton
                            color="inherit"
                            className="p-2 rounded"
                          >
                            <FaPause className="text-wt" />
                          </IconButton>
                          <IconButton
                            color="inherit"
                            className=" p-2 rounded ms-2"
                          >
                            <FaPlay className="text-wt" />
                          </IconButton>
                        </div>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
